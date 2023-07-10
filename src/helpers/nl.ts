import Handlebars from 'handlebars'

/**
 * Replace newlines with <br> tags.
 */
Handlebars.registerHelper('nlbr', function (text: string) {
    // Replace newlines with escape characters
    var escapedText = text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '\\n');
    // Surround the text with double quotes
    var jsonString = '"' + escapedText + '"';
    return jsonString;
})
