(function(window, undefined) {

    if (typeof window.StringBuilder === 'function') {
        return window.StringBuilder;
    }

    function filterString(input) {
        var type = typeof input,
            result = '';

        if (input === null || type === 'undefined') {
            return result;
        }

        // for string, number, boolean, also NaN
        result += input;

        return result;
    }

    StringBuilder = function(initStr) {
        this.array = [filterString(initStr)];
    };

    StringBuilder.prototype = {

        constructor: StringBuilder,

        append: function(input) {
            this.array.push(filterString(input));
            return this;
        },

        isEmpty: function() {
            return this.array.length === 0;
        },

        clear: function() {
            this.array.length = 0;
            return this;
        },

        // delete: function(start, end) {

        //  // if only start given, then delete one char which index is start
        //  if (typeof end === 'undefined') {
        //      this.array.splice(start, 1);
        //  } else {
        //      this.array.splice(start, end - start);
        //  }
        //  return this;
        // },

        reverse: function() {

            var thisArr = this.array,
                len = thisArr.length,
                i = -1;

            if (len === 1) {
                thisArr[0] = thisArr[0].split('').reverse().join('');
            } else {

                while (++i < len) {
                    thisArr[i] = thisArr[i].split('').reverse().join('');
                }
                thisArr.reverse();
            }
            return this;
        },

        toString: function() {
            return this.array.join('');
        },

        valueOf: function() {
            return this.toString();
        }
    };

    window.StringBuilder = StringBuilder;
})(window);