function add_thead(list){
    let table_html = "<tr>"
    for(let i = 0; i < list.length; i++){
        table_html += "<th>" + list[i] + "</th>"
    }
    table_html += "</tr>"
    return table_html
}
function add_tbody(list){
    let table_html = "<tr>";
    for(j = 0; j < list.length; j++){
        table_html += "<td>" + list[j] + "</td>";
    }
    table_html += "</tr>";
    return table_html
}

function create_table(rows){
    /**
    * creates a table
    * @param {list} rows - rows of csv
    */
    let table_html = "<tbody>";

    table_html += add_thead(rows[0].split(','));

    for(let i = 1; i < rows.length-1; i++){
        table_html += add_tbody(rows[i].split(','));
    }

    table_html+="</tbody>"
    $("#datatable").append(table_html)
}

function upload_file(){
    /**
    * handles the upload and viewing of csv data when btnLoad is clicked
    */
    var file = document.getElementById('csv_upload').files[0];
    if (file) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
            console.log(e.target.result)
            let rows = e.target.result.split('\n')
            create_table(rows);
        };
    }
}
