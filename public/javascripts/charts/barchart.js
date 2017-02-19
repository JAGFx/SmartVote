function generate_bar(receive_data, class_name)
{
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
   // ------------------------------------------------------------------------------------------------------------------     
    // set the ranges
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
    var y = d3.scaleLinear()
              .range([height, 0]);
              
    var svg = d3.select(class_name).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");
      
    // ------------------------------------------------------------------------------------------------------------------  
    //
    var color = d3.scaleOrdinal(d3.schemeCategory10);                     // Array de couleur. 

    var data = receive_data;                                              // init data.

    // Scale the range of the data in the domains
    x.domain(receive_data.map(function(d) { return d.label; }));
    y.domain([0, d3.max(receive_data, function(d) { return d.nb; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")   // pour chaque rect :
                  .on('mouseover',mouseover)
                  .transition()
                  .duration(300)
                  .delay(function (d, i)  {return i * 70; })
                  .attr("class", "bar")
                  .attr("x", function(d) { return x(d.label); })
                  .attr("width", x.bandwidth())
                  .attr("y", function(d) { return y(d.nb); })
                  .attr("height", function(d) { return height - y(d.nb); })
                  .style("fill", function(d,i)  { return color(d.nb);  });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // ------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------
    // Event 
    function mouseover(d,i)
    {
      d3.selectAll('.text_append').remove();
      d3.select(".infos").append('text').attr('class','text_append').text(" / Taux de "+d.label+" :   "+d.nb+"%");
      console.log(d)
    }
}