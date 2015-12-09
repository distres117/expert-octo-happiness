var fs = require('fs');

function mergeValues(values, content){
    //loop thru keys of values
    for (var key in values){
        //replace all {{key}} with values from values object
        content = content.replace("{{" + key + "}}", values[key])
    }
    
    
    return content;
}
        
function view(templateName, values, response){
    //read from the template files
    var contents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf-8'});
    //insert values into template
    contents = mergeValues(values, contents);
    //write out response
    response.write(contents);
    
    
    
    
}

module.exports.view = view;