function calculateAge() {
	const day = parseInt(document.getElementById("day").value);
	const month = parseInt(document.getElementById("month").value) - 1; // JavaScript months: 0-11
	const year = parseInt(document.getElementById("year").value);
  
	const birthDate = new Date(year, month, day);
	const today = new Date();
  
	if (isNaN(birthDate.getTime())) {
	  document.getElementById("result").innerText = "Please enter a valid date!";
	  return;
	}
  
	let ageYears = today.getFullYear() - birthDate.getFullYear();
	let ageMonths = today.getMonth() - birthDate.getMonth();
	let ageDays = today.getDate() - birthDate.getDate();
  
	if (ageDays < 0) {
	  ageMonths--;
	  ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
	}
  
	if (ageMonths < 0) {
	  ageYears--;
	  ageMonths += 12;
	}
  
	document.getElementById("result").innerText = 
	  `You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`;
  }
