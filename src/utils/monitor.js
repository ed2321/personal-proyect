const systemInformation = require('systeminformation');
const { hostname } = require('os');
const { APPLICATION_NAME, MAX_LATENCY, HEALTH_STATUS, COMPONENT_TYPE, UNIT } = require('./constants');
const { STATSD_INSTANCE } = process.env;

async function checkNewtork() {
  const latency = await systemInformation.inetLatency();
  const firstCheck = await systemInformation.inetChecksite('google.com');
  const secondCheck = await systemInformation.inetChecksite('cloudflare.com');
  const thirdCheck = await systemInformation.inetChecksite('opendns.com');

  if (firstCheck.ok || secondCheck.ok || thirdCheck.ok) {
    if (latency >= MAX_LATENCY) {
      return [true, HEALTH_STATUS.WARN];
    }
    return [true, HEALTH_STATUS.PASS];
  }

  if (!firstCheck.ok && !secondCheck.ok && !thirdCheck.ok) {
    return [false, HEALTH_STATUS.FAIL];
  }
}

function getStatus(value) {
  if (value >= 75) {
    return HEALTH_STATUS.WARN;
  }
  return HEALTH_STATUS.PASS;
}

function getGlobalStatus(data) {
  for (const key in data) {
    const failed = data[key].some((check) => check.status === HEALTH_STATUS.FAIL);
    const warn = data[key].some((check) => check.status === HEALTH_STATUS.WARN);
    if (failed) {
      return HEALTH_STATUS.FAIL;
    }

    if (warn) {
      return HEALTH_STATUS.WARN;
    }
  }
  return HEALTH_STATUS.PASS;
}

function Monitor() {
  this.stats = {
    service: APPLICATION_NAME,
    instance: STATSD_INSTANCE || hostname(),
  };
}

Monitor.prototype.cpu = async function (name = 'cpu:utilization') {
  const cpuStats = await systemInformation.currentLoad();
  const observedValue = cpuStats.currentload;
  const observedUnit = UNIT.PERCENT;
  const componentType = COMPONENT_TYPE.SYSTEM;
  const time = new Date(Date.now()).toISOString();
  const status = getStatus(observedValue);
  return {
    [name]: [
      {
        componentType,
        status,
        observedValue,
        observedUnit,
        time,
      },
    ],
  };
};

Monitor.prototype.network = async function (name = 'network:availability') {
  const [observedValue, status] = await checkNewtork();
  const observedUnit = '';
  const componentType = COMPONENT_TYPE.SYSTEM;
  const time = new Date(Date.now()).toISOString();
  return {
    [name]: [
      {
        componentType,
        status,
        observedValue,
        observedUnit,
        time,
      },
    ],
  };
};

Monitor.prototype.memory = async function (name = 'memory:utilization') {
  const memoryStats = await systemInformation.mem();
  const observedValue = (memoryStats.used / memoryStats.total) * 100;
  const observedUnit = UNIT.PERCENT;
  const componentType = COMPONENT_TYPE.SYSTEM;
  const time = new Date(Date.now()).toISOString();
  const status = getStatus(observedValue);

  return {
    [name]: [
      {
        componentType,
        status,
        observedValue,
        observedUnit,
        time,
      },
    ],
  };
};

Monitor.prototype.calculateStats = async function () {
  const networkStats = await this.network();
  const cpuStats = await this.cpu();
  const memoryStats = await this.memory();
  this.stats = {
    ...this.stats,
    checks: {
      ...networkStats,
      ...cpuStats,
      ...memoryStats,
    },
  };
};

Monitor.prototype.getStats = async function () {
  await this.calculateStats();
  const globalStatus = getGlobalStatus(this.stats.checks);
  return { status: globalStatus, ...this.stats };
};

module.exports = Monitor;
