# CascadingDropdown.js

A vanilla javascript (ie. no additional libraries needed) plugin for cascading dropdown menus.  This allows the values of an HTML `<select>` to be dependent on the value selected in a parent `<select>` element.
  
# Demo

[Demo](http://jsfiddle.net/bertwagner/kdtf3v4q/1/)

# Usage

## 1. Include CascadingDropdown.js

```
<script src="CascadingDropdown.js"></script>
```

## 2. Add markup to `<select>`

- `id`: each `<select>` must have an `id` defined.
- `class="cascadingDropdown"`: customizable in the plugin intialization options below.
- `data-select-message="..."`: the text displayed in the default option.
- `data-url`: the URL for ajax requests.
- `data-parent-fields`: comma delimited list of `id`s that the current field is dependent on.

For example:

```
<h2>Car Inventory:</h2>
<form>
  <select id="Year" name="Year" class="cascadingDropdown" data-url="/Year" data-select-message="Select a year...">
  </select>
  <select id="Make" name="Make" class="cascadingDropdown" data-url="/Make" data-parent-fields="Year" data-select-message="Select a make...">
  </select>
  <select id="Model" name="Model" class="cascadingDropdown" data-url="/Model" data-parent-fields="Year,Make" data-select-message="Select a model...">
  </select>
</form>
```

## 3. Initialize

```
CascadingDropdown.init({
	selector:'.cascadingDropdown',
  	source: function(url,parms,callback) {
    		//A json array containing Text and Value properties for each option must be passed into the callback.
    		callback([{"Text":"First Value","Value":"1"},{"Text":"Second Value","Value":"2"}]);
  	}
});
```

# License

The code is available under the [MIT License](https://github.com/bertwagner/Cascading-Dropdown/blob/master/LICENSE).
