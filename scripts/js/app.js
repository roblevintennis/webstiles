$(document).ready(function () {
    // Categorized colors e.g. _ambers, _blues, etc., from colors.js
    var colors = _colorz;
    // Create a flattened colors struct so we can quickly index by key
    var flattened = {};
    _.each(_colorz, function(colorGroup) {
        _.each(colorGroup, function(value, colorname) {
            flattened[colorname] = value;
        });
    });

// ============== COLORS ============= //

    function getColors(key) {
        var arr = _.map(colors[key], function(v, k) {
            return { id: k, text: k.substring(1) };
        });
        return arr;
    }

    // Default colors start as defined here
    var colorsInUse = {
        color1: '$redCrimson',
        color2: '$yellowGold',
        color3: '$blueSky',
        color4: '$grayCharcoal',
        color5: '$graySilver',
        color6: '$brownChocolate',
        // custom colors mainly for border and typo
        black: '$black',
        white: '$whiteSmoke',
    };
    // This sort of makes our statically defined colors redundant
    setCSSColor('color-1', colorsInUse.color1);
    setCSSColor('color-2', colorsInUse.color2);
    setCSSColor('color-3', colorsInUse.color3);
    setCSSColor('color-4', colorsInUse.color4);
    setCSSColor('color-5', colorsInUse.color5);
    setCSSColor('color-6', colorsInUse.color6);
    /**
     * This will go through the color group's corresponding DOM selectors and reset the
     * `color`, `background-color`, `border`, etc., as appropriate with new color.
     * -- NOTE -- The way we do this here requires that the JavaScript selectors match
     * up with whatever's set in the Sass/CSS. If we add new rules that use colors in the
     * CSS, we'll need to keep this consistent with those new rules so dynamic updates are
     * applied as expected.
     * @param {String} group    The colors group e.g. 'color-1', 'color-6', etc.
     * @param {String} newColor The new color. Can either by a key in to our color-me-sass
     * colors, or an actual color value e.g. `red` or `#ddd`.
     */
    function setCSSColor(group, newColor) {
        // If newColor is a key to our colors structure use, otherwise, assume a color value
        if (flattened[newColor]) {
            newColor = flattened[newColor];
        }
        switch (group) {
            case 'color-1':
                console.log("In color-1");
                $('.color-1').css('background', newColor);
                break;
            case 'color-2':
                console.log("In color-2");
                $('.color-2, .btn-secondary').css('background', newColor);
                $('mark').css('background', newColor);
                break;
            case 'color-3':
                console.log("In color-3");
                $('.menu a').css('border', '.25em solid '+newColor);
                $('input:focus, textarea:focus').css('border-color', newColor);
                // Changes all anchors colors (but NOT dynamic color-picker anchors)
                $('a, a:link, a:visited').not('.ws-settings a').css('color', newColor);
                // Hack since :not(:hover) no longer works properly in latest jquery :(
                $('.menu a').hover(
                    function(evt) { $(evt.currentTarget).css({
                            'color': flattened['$whiteSmoke'],
                            'background': newColor
                        });
                    },
                    function(evt) {
                        $(evt.currentTarget).css({
                            'color': newColor,
                            'background': 'transparent'
                        });
                    }
                );
                $('.color-3, .btn-primary').css('background', newColor);
                break;
            case 'color-4':
                console.log("In color-4");
                $('.color-4').css('background', newColor);
                break;
            case 'color-5':
                console.log("In color-5");
                $('.color-5').css('background', newColor);
                break;
            case 'color-6':
                console.log("In color-6");
                $('.color-6').css('background', newColor);
                break;
            default:
                console.log("In default case");
                break;
        }

        /*
// Custom colors
$black: #222;
$medium-black: lighten($black, 12%); #414141
$hard-black: darken($black, 14%); // #000

// Blacks
h1, h2, h3, h4, h5, h6 { color: $black
body, input, textarea, button, form, select {color: $medium-black;
mark {background: lighten($yellowGold, 5%) ; color: $hard-black;}

// Grays
.btn-tertiary {background: $gray-dark;
a:hover, a:active, a:focus {border-bottom-color: $gray-light;
fieldset {border-color: $graySilver;}
.ws-item {
    & > h1 {color: $gray-dark;

// Blues and Whites
a, a:link, a:visited {color: $blueSky;
.menu a {border: .25em solid $blueSky;
.menu a:hover {
  background: $blueSky;
  color: $whiteSmoke;
}
input:focus, textarea:focus {border-color: $blueSky;
input[type='button'], input[type='submit'], button, .button {
  background: $blueSky;
  color: $whiteSmoke;

.ws-settings {
  border: .25em solid $soft-white;
.colophon {
  border-top: thin solid $soft-white;
*/
    }

    var colorsForSelect2 = [
        { text: 'Ambers', children: getColors('_ambers') },
        { text: 'Blues', children: getColors('_blues') },
        { text: 'Bootstrap', children: getColors('_bootstrap') },
        { text: 'Browns', children: getColors('_browns') },
        { text: 'Grays', children: getColors('_grays') },
        { text: 'Greens', children: getColors('_greens') },
        { text: 'Limes', children: getColors('_limes') },
        { text: 'Oranges', children: getColors('_oranges') },
        { text: 'Peaches', children: getColors('_peaches') },
        { text: 'Pinks', children: getColors('_pinks') },
        { text: 'Preboot', children: getColors('_preboot') },
        { text: 'Purples', children: getColors('_purples') },
        { text: 'Reds', children: getColors('_reds') },
        { text: 'Tans', children: getColors('_tans') },
        { text: 'Turquoise', children: getColors('_turquoise') },
        { text: 'Whites', children: getColors('_whites') },
        { text: 'Yellows', children: getColors('_yellows') }
    ];

    /**
     * These are boiler-plate select2 constructor options to remove some duplication
     * between the various color-pickers using select2
     * @type {Object}
     */
    var select2Options = {
        allowClear: true,
        initSelection : function (element, callback) {
            var data = {id: element.val(), text: element.val()};
            callback(data);
        },
        //Allow manually entering color values in text in drop down.
        createSearchChoice: function (term, data) {
            if ($(data).filter(function () {
                return this.text.localeCompare(term) === 0;
            }).length === 0) {
                return {
                    id: term,
                    text: term
                };
            }
        },
        data: colorsForSelect2
    };
    // Set the value attribute so that initSelection works properly
    $("#color-picker-1").val(colorsInUse.color1);
    $("#color-picker-1").select2(select2Options);
    $("#color-picker-1").on("change", function(e) {
        console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
        // TODO:
        // 1. Check if val at all ... if not do nothing
        // 2. Check `flattened` by key of val (or id???) ... anyway, somehow see if it's from there
        // 3. Check if valid color or hex value (nice to have???)
        // 4. Reset the corresponding DOM elements for this color-N
    });

    $("#color-picker-2").val(colorsInUse.color2);
    $("#color-picker-2").select2(select2Options);
    $("#color-picker-2").on("change", function(e) {
        console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
    });

    $("#color-picker-3").val(colorsInUse.color3);
    $("#color-picker-3").select2(select2Options);
    $("#color-picker-3").on("change", function(e) {
        console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
        // TODO: We need this for the other colors too .. seems
        // like it's changing all colors on page too .. check what's going on
        setCSSColor('color-3', e.val);
    });

    $("#color-picker-4").val(colorsInUse.color4);
    $("#color-picker-4").select2(select2Options);
    $("#color-picker-4").on("change", function(e) {
        console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
    });

    $("#color-picker-5").val(colorsInUse.color5);
    $("#color-picker-5").select2(select2Options);
    $("#color-picker-5").on("change", function(e) {
        console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
    });

    $("#color-picker-6").val(colorsInUse.color6);
    $("#color-picker-6").select2(select2Options);
    $("#color-picker-6").on("change", function(e) {
        console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
    });


// ============== TYPOGRAPHY ============= //
    $("#font-picker").select2({
        // dropdownCssClass : 'bigdrop',
        placeholder: 'Create font-stack',
        allowClear: true
    });


//
// Serif font-stacks
//
/*
$garamond-font-stack: Garamond, Baskerville, "Baskerville Old Face", "Hoefler Text", "Times New Roman", serif !default;

$lucida-bright-font-stack: "Lucida Bright", Georgia, serif !default;

$palatino-font-stack: Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif !default;

$big-caslon-font-stack: "Big Caslon", "Book Antiqua", "Palatino Linotype", Georgia, serif !default;

$didot-font-stack: Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif !default;

$baskerville-font-stack: Baskerville, "Baskerville old face", "Hoefler Text", Garamond, "Times New Roman", serif !default;

$hoefler-text-font-stack: "Hoefler Text", "Baskerville old face", Garamond, "Times New Roman", serif !default;

$bodoni-mt-font-stack: "Bodoni MT", Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif !default;

$goudy-old-style-font-stack: "Goudy Old Style", Garamond, "Big Caslon", "Times New Roman", serif !default;

$constantia-font-stack: Constantia, Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif !default;

$cambria-font-stack: Cambria, Georgia, serif !default;

$book-antiqua-font-stack: "Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif !default;


//
// Sans-Serif font-stacks
//

$optima-font-stack: Optima, Segoe, "Segoe UI", Candara, Calibri, Arial, sans-serif !default;

$futura-font-stack: Futura, "Trebuchet MS", Arial, sans-serif !default;

$gill-sans-font-stack: "Gill Sans", "Gill Sans MT", Calibri, sans-serif !default;

$trebuchet-font-stack: "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif !default;

$helvetica-font-stack: "Helvetica Neue", Arial, Helvetica, sans-serif !default;

$verdana-font-stack: Verdana, Geneva, sans-serif !default;

$lucida-grande-font-stack: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif !default;

$geneva-font-stack: Geneva, Tahoma, Verdana, sans-serif !default;

$segoe-font-stack: Segoe, "Segoe UI", "Helvetica Neue", Arial, sans-serif !default;

$candara-font-stack: Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif !default;

$calibri-font-stack: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif !default;

$franklin-gothic-font-stack: "Franklin Gothic Medium", Arial, sans-serif !default;

$tahoma-font-stack: Tahoma, Geneva, Verdana, sans-serif !default;


//
// Monospace font-stacks
//
// Consolas is not included in this stack because it is much smaller than the other fonts listed in the stack.
//

$monospace-font-stack: "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace !default;


//
// Cursive font-stacks
//

$cursive-font-stack: "Bradley Hand ITC", "Apple Chancery", "URW Chancery L", cursive !default;
*/

});