/**
 * Tracks a pageview to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL is probably a good start though.
 */
export const trackPageview = (params: {
  url: string;
  chosenVariants: number[];
}) => {
  console.log(
    `--> Tracking Pageview:\nurl: ${params.url}\nchosenVariants: ${params.chosenVariants}`
  );
};

/**
 * Tracks an event to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL and an event name are probably a good start though.
 */
export const trackEvent = (params: {
  url: string;
  chosenVariants: number[];
  event: string;
}) => {
  console.log(
    `--> Tracking Event:\nurl: ${params.url}\nchosenVariants: ${params.chosenVariants}\nevent: ${params.event}`
  );
};
