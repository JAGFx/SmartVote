const CHART_CLASS_NAME = '.chart';
const BUTTON_CHANGE_CLASS_NAME = '.button-change-graph';

function generateChart(data) {
	var onclick = false;

	d3.select(BUTTON_CHANGE_CLASS_NAME).on('click',function()
	{
		d3.select(CHART_CLASS_NAME).selectAll('svg').remove();
		if(onclick == false){
			generate_pie(data, CHART_CLASS_NAME);
			onclick = true;
		} else {
			generate_bar(data, CHART_CLASS_NAME);
			onclick = false;
		}
	});
}

function updateChart(data) {
	d3.select(CHART_CLASS_NAME).selectAll('svg').remove();
	generate_pie(data, CHART_CLASS_NAME);
}
