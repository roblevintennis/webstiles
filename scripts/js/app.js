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

    function getColors(key) {
        var arr = _.map(colors[key], function(v, k) {
            return { id: k, text: k.substring(1) };
        });
        return arr;
    }

    // Default colors start as defined here
    var colorsUsed = {
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
/*
// Custom colors
$black: #222;
$medium-black: lighten($black, 12%); #414141
$hard-black: darken($black, 14%); // #000

// Blacks
h1, h2, h3, h4, h5, h6 { color: $black
body, input, textarea, button, form, select {color: $medium-black;
mark {background: $yellow; color: $hard-black;}

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

    $("#color-picker-1").select2({
        // dropdownCssClass : 'bigdrop',
        placeholder: 'Select Colors',
        allowClear: true,
        //Allow manually entered text in drop down.
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
        data: colorsForSelect2,
        /* Example data structure select2 accepts
        data: [
            { text: "Blues", children: [
                { id: "$Blue", text: "Blue" },
                { id: "$BlueLight", text: "BlueLight" }
            ] }
        ]
        */
    });
    $("#color-picker-1").on("change", function(e) {
        console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
        // TODO:
        // 1. Check if val at all ... if not do nothing
        // 2. Check `flattened` by key of val (or id???) ... anyway, somehow see if it's from there
        // 3. Check if valid color or hex value (nice to have???)
        // 4. Reset the corresponding DOM elements for this color-N
    });
    $("#color-picker-2").select2({
        // dropdownCssClass : 'bigdrop',
        placeholder: 'Select Colors',
        allowClear: true,
        //Allow manually entered text in drop down.
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
        data: colorsForSelect2,
        /*
        ,formatResult: function(exercise) {
            return "<div class='select2-user-result'>" + exercise.term + "</div>";
        },
        formatSelection: function(exercise) {
            return exercise.term;
        },
        initSelection : function (element, callback) {
            var elementText = $(element).attr('data-init-text');
            callback({"term":elementText});
        }
        */
    });

    $("#font-picker").select2({
        // dropdownCssClass : 'bigdrop',
        placeholder: 'Create font-stack',
        allowClear: true
    });

});