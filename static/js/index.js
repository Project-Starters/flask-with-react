
function add_tools(id, graph_id, state){
    console.log(graph_id);
    let html = `
    <div class="tools">
        <button class="tools-btn" id="like-btn" onclick="upvote('`+id + `',` +graph_id+`)"> <img src="static/imgs/up.png" style="width: 32px; height: 32px;"> </img> </button>
        <br>
        <button class="tools-btn" id="info-btn" onclick="open_modal('`+ id + `',` + graph_id+`)"> <img src="static/imgs/info.svg" style="margin-left: 4px; width: 24px; height: 24px;"> </img> </button>
    </div>
    `
    $(id).append(html);
    set_state_upvote(id, state);    
}

function set_state_upvote(id, state){
    let button = $(id).children('div.tools').children('button#like-btn').children('img')    
    // console.log()
    if (state){
        button.attr('src', 'static/imgs/up1.png');   
    }else{
        button.attr('src', 'static/imgs/up.png');           
    }

}

function upvote(id, graph_id){
    // console.log($(id).children('div.tools').children('button').children('img'))
    let button = $(id).children('div.tools').children('button#like-btn').children('img')    
    
    if (button.attr('src') == 'static/imgs/up.png'){
        set_state_upvote(id, true);
        $.ajax({
            url: "/like?post_id="+String(graph_id),
            type: 'PUT',
            success: function(response) {
                console.log(response)
            }
        });

            
    }else{
        set_state_upvote(id, false);
        
        $.ajax({
            url: "/like?post_id="+String(graph_id),
            type: 'DELETE',
            success: function(response) {
                console.log(response)
            }
        });   
    }

}

function open_modal(id){
    let button = $(id).children('div.tools').children('button#info-btn').children('img')

}

function create_linear_trace(graph_data){
    var trace1 = {
        x: graph_data['x'],
        y: graph_data['y'],
        type: 'scatter'
    };
    var data = [trace1];

    return data
}

function add_graph(graph_dict, key){
    $("#i" + key).css({ 'width': graph_dict['width'] });
    let gd = Plotly.d3.select('#g' + key).style().node();
    let h = $("#i" + key).height();
    var layout = {
        showlegend: false,
        margin: {
            t: 50, //top margin
            l: 40, //left margin
            r: 40, //right margin
            b: 25 //bottom margin
        },
        height: h,
        title: graph_dict['title'],
    };
    
    data = create_linear_trace(graph_dict['data'])

    Plotly.plot(gd, data, layout)
    $.ajax({
        url: "/get_liked?post_id="+String(graph_dict.id),
        type: 'get',
        success: function(response){
            // console.log(response=='true')
            add_tools("#i"+key, graph_dict.id, response=='true');
        }
    });
    return gd
}

function add_graph_resize(gds){
    window.onresize = function () {
        for (i in gds) {
            try{
                Plotly.Plots.resize(gds[i]);                
            }catch(e){}
        }
    };
}

function load_graphs(url){
    $.get(url, function (graphs, status) {
        if (status == 'success') {
            let gds = [];
            for (let key in graphs) {
                gds.push(add_graph(graphs[key], key));

            }
            add_graph_resize(gds);

        }
    });
}