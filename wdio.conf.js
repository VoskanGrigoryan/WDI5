const reportportal = require("wdio-reportportal-reporter");
const RpService = require("wdio-reportportal-service");

const conf = {
    reportPortalClientConfig: {
        // report portal settings
        token: "00000000-0000-0000-0000-00000000000",
        endpoint: "https://reportportal-url/api/v1",
        launch: "launch_name",
        project: "project_name",
        mode: "DEFAULT",
        debug: false,
        description: "Launch description text",
        attributes: [{ key: "tag", value: "foo" }],
        headers: { foo: "bar" }, // optional headers for internal http client
    },
    reportSeleniumCommands: false, // add selenium commands to log
    seleniumCommandsLogLevel: "debug", // log level for selenium commands
    autoAttachScreenshots: false, // automatically add screenshots
    screenshotsLogLevel: "info", // log level for screenshots
    parseTagsFromTestTitle: false, // parse strings like `@foo` from titles and add to Report Portal
    cucumberNestedSteps: false, // report cucumber steps as Report Portal steps
    autoAttachCucumberFeatureToScenario: false, // requires cucumberNestedSteps to be true for use
    isSauseLabRun: false, // automatically add SauseLab ID to rp tags.
};

exports.config = {
    reporters: [[reportportal, conf]],

    wdi5: {
        screenshotPath: require("path").join("zerotouch_billingrequestor", "webapp", "test", "screenshots"),
        screenshotsDisabled: false,
        logLevel: "error",
        url: "index.html",
        skipInjectUI5OnStart: false,
        waitForUI5Timeout: 40000,
    },

    runner: "local",
    featureFlags: {
        specFiltering: true,
    },

    specs: ["./uimodule/webapp/test/e2e/*.test.js"],

    exclude: [],

    maxInstances: 10,

    capabilities: [
        {
            maxInstances: 5,
            browserName: "chrome",
            acceptInsecureCerts: true,
        },
    ],

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: "info",

    bail: 0,

    baseUrl: "http://localhost:8080",

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    services: [[RpService, {}]],

    framework: "mocha",

    // reporters: ["spec"],

    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: "bdd",
        timeout: 60000,
    },

    // onComplete: function () {
    //     const reportError = new Error("Could not generate Allure report");
    //     const generation = allure(["generate", "allure-results", "--clean"]);
    //     return new Promise((resolve, reject) => {
    //         const generationTimeout = setTimeout(() => reject(reportError), 5000);

    //         generation.on("exit", function (exitCode) {
    //             clearTimeout(generationTimeout);

    //             if (exitCode !== 0) {
    //                 return reject(reportError);
    //             }

    //             console.log("Allure report successfully generated");
    //             resolve();
    //         });
    //     });
    // },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialized
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just after a worker process has exited.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {Number} exitCode 0 - success, 1 - fail
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {Number} retries  number of retries used
     */
    // onWorkerEnd: function (cid, exitCode, specs, retries) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. 0-0)
     */
    // beforeSession: function (config, capabilities, specs, cid) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {Object}  test             test object
     * @param {Object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {Any}     result.result    return object of test function
     * @param {Number}  result.duration  duration of test
     * @param {Boolean} result.passed    true if test has passed, otherwise false
     * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    // afterTest: function(test, context, { error, result, duration, passed, retries }) {
    // },

    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
     * Gets executed when a refresh happens.
     * @param {String} oldSessionId session ID of the old session
     * @param {String} newSessionId session ID of the new session
     */
    // onReload: function(oldSessionId, newSessionId) {
    // }
};
