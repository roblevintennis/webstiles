$(document).ready(function () {
    var colors = _colorz;
    console.log("DEBUGGING colors: ");
    console.dir(colors);

    $("#color-picker").select2({
        // dropdownCssClass : 'bigdrop',
        placeholder: 'Select Colors',
        allowClear: true,
        //Allow manually entered text in drop down.
        // createSearchChoice:function(term, data) {
        //     if ($(data).filter(function() { return this.text.localeCompare(term)===0; }).length===0) {
        //         return {id:term, text:term};
        //     }
        // }
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
    // width: '300px',
        data: [
            {id: 0, text: 'story'},
            {id: 1, text: 'bug'},
            {id: 2, text: 'task'}
        ]
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