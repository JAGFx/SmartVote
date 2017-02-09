function generateChart(receive_data, class_name, button)
{
	var onclick = false;

	d3.select(button).on('click',function()
	{
		if(onclick == false)
		{
			d3.select(class_name).selectAll('svg').remove();
			generate_pie(receive_data,class_name)
			onclick = true;
		}
		else
		{
			d3.select(class_name).selectAll('svg').remove();
			generate_bar(receive_data,class_name)
			onclick = false;
		}
	});

	function mouseover(d,i)
	{
	  d3.selectAll('.text_append').remove();
	  d3.select(".infos").append('text').attr('class','text_append').text(" / Taux de réponse "+i+":  "+d.data+"%");
	  console.log(d)
	}

}
