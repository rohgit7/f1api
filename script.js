document.getElementById('fetchDriver').addEventListener('click', () => {
    const driverInput = document.getElementById("f1Driver");
    const driverName = driverInput.value.trim(); // Get the value and trim whitespace
    const errorDiv = document.getElementById("error");
    const resultsDiv = document.getElementById("results");
  
    // Clear previous error or results
    errorDiv.textContent = "";
    resultsDiv.innerHTML = "";
  
    if (!driverName) {
      errorDiv.textContent = "Please enter a driver's name.";
      return;
    }
  
    fetch(`https://api.openf1.org/v1/drivers?first_name=${driverName}&session_key=9158`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          // Ensure the structure of the response matches the expected format
          const driver = data[0]; // Assuming the first result is the correct driver
          resultsDiv.innerHTML = `
            <h2>Driver Details</h2>
             <img src="${driver.headshot_url}" alt="${driver.first_name} ${driver.last_name}" style="width: 200px; height: auto; border-radius: 8px;">
             <p><strong>Driver ID:</strong> ${driver.driver_number}</p>
             <p><strong>Name:</strong> ${driver.first_name} ${driver.last_name}</p>
            <p><strong>Broadcast Name:</strong> ${driver.broadcast_name}</p>
            <p><strong>Team:</strong> ${driver.team_name}</p>
            <p><strong>Country:</strong> ${driver.country_code}</p>
            
          `;
        } else {
          errorDiv.textContent = "No driver found with the given name.";
        }
      })
      .catch(error => {
        errorDiv.textContent = `An error occurred: ${error.message}`;
      });
  });
  