const restaurant = JSON.parse(localStorage.getItem('restaurant'));
const cardsMenu = document.querySelector('.cards-menu');

const changeTitle = (restaurant) => {
	const restaurantTitle = document.querySelector('.restaurant-title');
	const rating = document.querySelector('.rating');
	const price = document.querySelector('.price');
	const category = document.querySelector('.category');

	restaurantTitle.textContent = restaurant.name;
	rating.textContent = restaurant.stars;
	price.textContent = restaurant.price;
	category.textContent = restaurant.kitchen;
}

const renderItems = (data) => {
	data.forEach(item => {
		const card = document.createElement('div');
		card.classList.add('card');

		card.innerHTML = `
			<img src="${item.image}" alt="${item.name}" class="card-image" />
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title card-title-reg">Пицца ${item.name}</h3>
				</div>
				<!-- /.card-heading -->
				<div class="card-info">
					<div class="ingredients">${item.description}</div>
				</div>
				<!-- /.card-info -->
				<div class="card-buttons">
					<button class="button button-primary button-add-cart">
						<span class="button-card-text">В корзину</span>
						<span class="button-cart-svg"></span>
					</button>
					<strong class="card-price-bold">${item.price} ₽</strong>
				</div>
			</div>
			<!-- /.card-text -->
		`;

		cardsMenu.append(card);
	});
};

if (restaurant) {

	changeTitle(restaurant);

	fetch(`https://delivery-food-js-default-rtdb.firebaseio.com/db/${restaurant.products}`)
		.then((response) => response.json())
		.then((data) => {
			renderItems(data);
		})
		.catch((error) => {
			console.log(error);
		})
} else {
	window.location.href = '/';
}