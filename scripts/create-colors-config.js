#!/usr/bin/env node

/**
 * The purpose of this script is to read in all the files
 * from the color-me-sass `colors` subdirectory, and place
 * those in a JavaScript accessible data structure, then
 * write out to a color-me-sass.js file for later use.
 *
 * It uses Node.js
 */
var fs = require('fs');
var path = require('path');
// http://nodejs.org/api/readline.html
// var readline = require('readline');
var filedata = '';
var colors = {};

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}
function getFilename(filename, ext) {
    return path.basename(filename, ext);
}

/**
 * Reads the color file line by line and parses out the color vars in to data structure
 */
function readColorFile(name, path, func) {
    // Clear out our global filedata var
    filedata = '';
    var input = fs.createReadStream(path);
    var remaining = '';

    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        var last  = 0;
        // Read data line by line
        while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            func(name, line);
            index = remaining.indexOf('\n', last);
        }
        remaining = remaining.substring(last);
    });
    input.on('end', function() {
        func(name, remaining);
        console.log("----- COLORS (so far) -----");
        console.dir(colors);
        console.log("-----ENDS: COLORS-----");
    });
}
/**
 * Actually parses a single line for a particular file and adds to our
 * colors data structure (with the key of our `filename` passed in)
 */
function colorLineHandler(filename, data) {
    // console.log('File: '+filename+ '\tLine: ' + data);
    if (data.length > 0) {
        filedata += data;
    }
    // colors[filename] = filedata;
    if (!colors[filename]) {
        colors[filename] = {};
    }
    var key, value,
        split = data.trim().split(':');
    if (split.length > 1) {
        key = split[0];
        // split[1] should have something like:
        // "          #8db600 !default;" so we trim and split again
        value = split[1].trim().split(' ')[0];
        // console.log("Key: ", key);
        // console.log("Value: ", value);
        if (key && value) {
            colors[filename][key] = value;
        }
    }
}

function readColorsDir (currentPath) {
    console.log(currentPath);
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
        var currentFile = currentPath + path.sep + files[i];
        var stats = fs.statSync(currentFile);
        if (stats.isFile()) {
            console.log(currentFile);
            var ext = getExtension(currentFile);
            var name = getFilename(currentFile, '.'+ext);
            if (ext === 'scss') {
                // console.log("About to read: ", name);
                readColorFile(name, currentFile, colorLineHandler);
            }
        }
        else if (stats.isDirectory()) {
            readColorsDir(currentFile);
        }
    }
};

// argv[1] will be path to this script which is in: /full/path/to/<webstiles>/scripts
// we utlize that fact to build a path to our colors dir
var colorsPath = path.join(process.argv[1], '../../sass/colors/colors');
readColorsDir(colorsPath);

