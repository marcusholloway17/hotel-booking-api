const lang = require("./lang.json");
const axios = require("axios");
const { format } = require('date-fns');

const slugify = (string) => {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Send notification to
 * @param {*} hook String Slack hook
 * @param {*} content String Content to notify
 */
const custom_notify = async (hook, content) => {
  if (process.env.ALLOW_SLACK_NOTIF === 'true') {
    axios
      .post(hook, content)
      .then(() => {
        // console.log("Nofitication send");
      })
      .catch((err) => {
        const dateTime = `${format(new Date(), "dd/MM/yyyy\tHH:mm:ss")}`;
        error_notification({
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `\`${dateTime}\``,
              },
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `*error while sending notification* \n${err}`,
                },
              ],
            },
          ],
        });
      });
  }
};

/**
 * Send error notification to slack channel
 * @param {*} content String Content to notify
 */
const error_notification = async (content) => {
  return custom_notify(process.env.SLACK_ERROR_HOOK, content);
};

/**
 * Send log notification to slack channel
 * @param {*} content String Content to notify
 */
const log_notification = async (content) => {
  if (process.env.ALLOW_SLACK_LOG_NOTIF === 'true') {
    return custom_notify(process.env.SLACK_LOG_HOOK, content);
  }
};

/**
 * Translate reponse message to different language
 * @param { Object } request Request object
 * @param { Object } message message to send
 * @returns { String }
 */
const translate = (request, message) => {
  const language = handleLanguage(request);
  try {
    return lang[String(language)][message];
  } catch (error) {
    return lang.eng[message];
  }
};

/**
 * Handle the language in request query or set to english by default
 * @param { Object } request Request object
 * @returns { String }
 */
const handleLanguage = (request) => {
  return request.query.lang ? request.query.lang : "eng";
};

/**
 * Return a custom response object
 * @param { Object } response Response Object
 * @param { Integer } statusCode Http status code
 * @param { Boolean} success True if success and false if error occured
 * @param { ?Object } data Data to be returned
 * @param { String } message Message to notify
 * @returns { Object } Object
 */
const custom = (response, statusCode, success, data, message) => {
  return response.status(statusCode).json({
    success: success,
    data: data,
    message: message,
  });
};

/**
 * Return 400 Bad Request error
 * @param { Object } req Request object
 * @param { Object } res Response object
 * @returns { Object }
 */
const badResquest = (req, res) => {
  return custom(res, 400, false, null, translate(req, "missing_parameters"));
};

/**
 * Return 409 Conflict error
 * @param { Object } req Request object
 * @param { Object } res Response object
 * @returns { Object }
 */
const conflict = (req, res) => {
  return custom(res, 409, false, null, translate(req, "already_exist"));
};

/**
 * Return 404 Not Found error
 * @param { Object } req Request object
 * @param { Object } res Response object
 * @returns { Object }
 */
const notFound = (req, res) => {
  return custom(res, 404, false, null, translate(req, "not_found"));
};

/**
 * Return 201 Created response
 * @param { Object } req Request object
 * @param { Object } res Response object
 * @returns { Object }
 */
const success = (req, res) => {
  return custom(res, 201, false, null, translate(req, "successfull_operation"));
};

/**
 * Return an error specified at error parameter
 * @param { Object } req Request object
 * @param { String } error error message | object to be returned
 * @returns { Object }
 */
const error = async (res, error) => {
  const dateTime = `${format(new Date(), "dd/MM/yyyy\tHH:mm:ss")}`;
  await error_notification({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\`${dateTime}\``,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `*ERREUR 500 - ENV ${process.env.NODE_ENV}* \n${error}`,
          },
        ],
      },
    ],
  }
)
  return custom(res, 500, false, null, error);
};

/**
 * Return 403 Forbidden error
 * @param { Object } req Request object
 * @param { Object } res Response object
 * @returns { Object }
 */
const forbidden = (req, res) => {
  return custom(res, 403, false, null, translate(req, "forbidden"));
};

/**
 * Return 401 Unauthorized error
 * @param { Object } req Request object
 * @param { Object } res Response object
 * @returns { Object }
 */
const unauthorized = (req, res) => {
  return custom(res, 401, false, null, translate(req, "unauthorized"));
};

module.exports = {
  custom,
  badResquest,
  conflict,
  notFound,
  success,
  error,
  forbidden,
  unauthorized,
  slugify,
  translate,
  handleLanguage,
  custom_notify,
  error_notification,
  log_notification,
};
