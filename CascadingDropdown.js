var CascadingDropdown = (function () {
	'use strict';

  //
  // Variables
  //
  var cascadingDropdown = {};
  var defaults = {
  	selector: '.cascadingDropdown'
  };
  
  
  //
  // Methods
  //
  var ParentParms = function(element) {
    var parms = {};
    var parentFields = element.getAttribute('data-parent-fields');
   	if (parentFields)
    {
    	var parentIds = parentFields.split(',');
      for (var i=0; i<parentIds.length; i++)
      {
        parms[parentIds[i]] = document.querySelector('#'+parentIds[i]).value;
      }
    }

    return parms;
  }
  
  var CheckDropdownDependencies = function(element,source) {
    var changedElementId = element.id;

    var cascadingDropdowns = document.querySelectorAll(cascadingDropdown.selector);

    for (var i=0; i < cascadingDropdowns.length; i++)
    {
      var dropdown = cascadingDropdowns[i];
      var parentIds = (dropdown.getAttribute('data-parent-fields')||'').split(',');
      // Does the cascading dropdown have the changedElementId as a parent?
      if (parentIds.indexOf(element.id) > -1)
      {
        PopulateDropdown(dropdown,source);
      }
    }
  }

  var PopulateDropdown = function (element) {
    //
    // Inits & Event Listeners
    //
    var url = element.getAttribute('data-url');
    var parms = ParentParms(element);

    // Disable dropdown to prevent selections during load
    element.disabled=true;
    
    var optionData = cascadingDropdown.source(url,parms,function(optionData){
      var existingValue = element.value;
      //Clear existing options
      element.textContent=undefined;

      var option = document.createElement('option');
      option.selected=true;
      option.disabled=true;
      
      if (optionData)
      {
        option.textContent = element.getAttribute('data-select-message');
        element.appendChild(option);
        for (var i=0; i < optionData.length; i++)
        {
          //Add to options
          option = document.createElement('option');
          option.textContent = optionData[i].Text;
          option.setAttribute('value',optionData[i].Value);
          element.appendChild(option);
        }

        // Reenable if more than just the instruction text exists
        if (optionData.length > 0)
        {
          element.disabled=false;
        }
      }
      // see if the previous value still exists and set it
      if (existingValue)
      {
      	// this if is to prevent an issue in IE where it tries to set the default select message when disabled
        if (existingValue != element.getAttribute('data-select-message')) {
          for (var i=0; i<element.options.length; i++)
          { 
            if (element.options[i].value == existingValue) 
            { 
              element.value=existingValue;
            } 
          }
        }
      }
  	});
  };
  
  
  //
  // Inits & Event Listeners
  //
  cascadingDropdown.init = function(options) {
  	this.selector = options.selector || defaults.selector,
    this.source = options.source;
    
    var dropdowns = document.querySelectorAll(cascadingDropdown.selector);
  
  	//Initialize dropdowns that are not dependent on other values
    for (var i=0; i < dropdowns.length; i++)
    {
      var element = dropdowns[i];
      PopulateDropdown(element);
    }

    // Listen to changes to dropdowns
    document.addEventListener('change', function(event){
      if (event.target.matches(cascadingDropdown.selector))
      {
        var element = document.querySelector("#"+event.target.id);
        CheckDropdownDependencies(element);
      }
    },false);
  }
  
	return cascadingDropdown;
})();
