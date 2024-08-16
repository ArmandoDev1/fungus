export const saveDataToFile = (data, filename) => {
    const file = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  export const loadDataFromFile = (event, callback) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        callback(data);
      };
      reader.readAsText(file);
    }
  };
  
  export const fetchDataFromFile = async (filename) => {
    const response = await fetch(`${process.env.PUBLIC_URL}/assets/${filename}`);
    const data = await response.json();
    return data;
  };
  