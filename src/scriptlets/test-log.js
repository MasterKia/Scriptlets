/**
 * Test function to check is scriptlet works
 * Log an array of passed arguments
 * @param {string} args test arguments
 */
function testLog(...args) {
    console.log(args);
}
testLog.names = ['test-log'];

export default testLog;