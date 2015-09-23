## Select all
A javascript plugin to create a 'select all' checkbox to check and uncheck all the linked checkboxes.

### Usage
Create a master checkbox with a **`data-select-all`** attribute, the value of this attribute should be a selector for the linked checkboxes, e.g **`[name='assets[]']`**

```javascript
<input type="checkbox" class="is-none" data-select-all="[name='assets[]']" id="select-all" />
```
