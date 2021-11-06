const renderItems = (data) => {
	console.log(data);
	data.forEach(element => {
		console.log(element);
	});
};

fetch('https://delivery-food-js-default-rtdb.firebaseio.com/db/partners.json')
	.then((response) => response.json())
	.then((data) => {
		renderItems(data);
	})
	.catch((error) => {
		console.log(error);
	})