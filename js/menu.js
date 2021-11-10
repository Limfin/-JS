// const menu = () => {
	const restaurant = JSON.parse(localStorage.getItem('restaurant'));
	const cardsMenu = document.querySelector('.cards-menu');
	const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

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

	const addToCart = (cartItem) => {
		if (cartArray.some((elem) => elem.id === cartItem.id)) {
			cartArray.map((elem => {

				if(elem.id === cartItem.id) {
					elem.count++
				}

				return elem
			}))
		} else {
			cartArray.push(cartItem);
		}
		

		localStorage.setItem('cart', JSON.stringify(cartArray));
	}

	const renderItems = (data) => {
		data.forEach(item => {
			const card = document.createElement('div');
			card.classList.add('card');

			card.innerHTML = `
			<img src="${item.image}" alt="${item.name}" class="card-image" />
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title card-title-reg">${item.name}</h3>
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

			card.querySelector('.button-card-text').addEventListener('click', () => {
				// const cartItem = {
					// id: item.id,
				// 	name: item.name,
				// 	price: item.price,
				// 	count: 1
				// }

				addToCart({id: item.id, name: item.name, price: item.price, count: 1});
			})

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
// }


// menu();