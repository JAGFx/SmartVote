/*
*   FORMAT :
*     receive_data : {"label" : "reponseA","nb" : 12 },
*     class_name :  ".clas_name"
*
*
*/
function generate_pie(receive_data, class_name)   //
{
  // ------------------------------------------------------------------------------------------------------------------
  // Global var
  var data = [];
  var assoc_index_color = new Object();
  var assoc_data2 = new Object();
  var width = 400,
    height = 400,
    radius = Math.min(width, height) / 2;
  // ------------------------------------------------------------------------------------------------------------------
  // Format data
    for (var i = 0; i < receive_data.length; i++) {
        data.push(receive_data[i]['nb']);                               // reformat data
        assoc_data2[i] = receive_data[i]['label'];  // link data and reveid
    }
  // ------------------------------------------------------------------------------------------------------------------
  //
  // Initialisation de l'endroit du dessin :
  var svg = d3.select(class_name).append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
  ;
  // ----------------------

  var color = d3.scaleOrdinal(d3.schemeCategory10);                 // array de couleur

  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70)
  ;

  var labelArc = d3.arc()
    .outerRadius(radius - 35)
    .innerRadius(radius - 35)
  ;

  var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d; })
  ;

  var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");
  ;

  g.append("path")
    .attr("d", arc)
    .on('mouseover', mouseover)
    .attr("fill", function(d,i){
      assoc_index_color[i] =  color(i);
      return color(i)
    })
    .transition()
    .duration(function(d, i)
    {
      return i * 400;
    })
  .attrTween('d', function(d)
    {
       var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
       return function(t)
       {
           d.endAngle = i(t);
         return arc(d);
       }
    })
  ;
  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("dx",'-10px')
      .text(function(d) { return d.data; });

  var new_groupe = d3.select(class_name).append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
  ;
  // ------------------------------------------------------------------------------------------------------------------
  for (var i = receive_data.length - 1; i >= 0; i--) {
      new_groupe.append('rect')
          .attr("width",50)
          .attr('height',25)
          .attr('x',10)
          .attr('y',30*i)
          .attr("fill",componentToHex(assoc_index_color[i]) )
          .attr("stroke","black")
      ;
      new_groupe.append('text')
          .text( assoc_data2[i] +" / Taux de réponse :  "+data[i]+"%")
          .attr('x',80)
          .attr('y',30*i)
          .attr('dy',15)
      ;
  }
  // ------------------------------------------------------------------------------------------------------------------
  // Event listener
  function mouseover(d,i)
  {
  d3.selectAll('.text_append').remove();
  d3.select(".infos").append('text').attr('class','text_append').text(" / Taux de réponse "+i+":  "+d.data+"%");
  console.log(d)
  }
}  // END OF FUNCTION PIE
// ------------------------------------------------------------------------------------------------------------------
// Tool Box

function componentToHex(c)
{
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b)
{
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
