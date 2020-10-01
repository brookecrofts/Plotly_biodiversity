// Use D3 library to read in samples.json
var file_path = 'samples.json'

d3.json(file_path).then(function(data){
  // console.log(data);
  dropdown(data);
});

//program optionChanged to match html
function dropdown(sampleData) {
  sampleData['names'].forEach(name=>{
    var newOption = d3.select('#selDataset').append('option')
    newOption.text(name);
    newOption.property('value', name);
  });
};

//program to set the newly selected value
function optionChanged(selected) {
  console.log(selected);
    buildBar(selected);
    buildTable(selected);
};

//filter down to top 10 OTUs
function buildBar(sampleId) {
  d3.json(file_path).then(function(data){
    var samples=data['samples'];
    var selectedSample=samples.filter(sample => sample.id==sampleId)[0];
    // console.log(selectedSample)
    traceBar={
      type: 'bar',
      y: selectedSample['otu_ids'].map(otu_ids=>'OTU '+otu_ids.toString()).slice(0,10).reverse(),
      x: selectedSample['sample_values'].slice(0,10).reverse(),
      text: selectedSample['otu_labels'].slice(0,10).reverse(),
      orientation: 'h'
    };
    // console.log(trace);
    Plotly.newPlot('bar', [traceBar])


    traceBubble={
      type: 'scatter',
      x: selectedSample['otu_ids'],
      y: selectedSample['sample_values'],
      mode: 'markers',
      marker: {
        size: selectedSample['sample_values'].map(sample_value=>sample_value/2),
        color: selectedSample['otu_ids'],
        colorscale: 'Earth'
      }
    };
    Plotly.newPlot('bubble', [traceBubble])

  });
};

// forEach object.entries add new lih6

function buildTable(sampleId) {
  d3.json(file_path).then(function(data){
    var metadata=data['metadata'];
    var selectedMetadata=metadata.filter(meta=>meta['id']==sampleId)[0];
    // console.log(selectedMetadata);
    var panel = d3.select('#sample-metadata');
    panel.html('');
    Object.entries(selectedMetadata).forEach(([meta_key, meta_value])=>{
      panel.append('h5')
        .text(`${meta_key}: ${meta_value}`);
    });
  });
};
