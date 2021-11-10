// const partners = () => {
	const cardsRestaurants = document.querySelector('.cards-restaurants');
	const user = JSON.parse(localStorage.getItem('user'));

	const renderItems = (data) => {
		data.forEach(item => {
			const a = document.createElement('a');
			a.setAttribute('href', '/restaurant.html');
			a.classList.add('card');
			a.classList.add('card-restaurant');
			a.dataset.products = item.products;

			a.innerHTML = `
			<img src="${item.image}" alt="${item.name}" class="card-image" />
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">${item.name}</h3>
					<span class="card-tag tag">${item.time_of_delivery} мин</span>
				</div>
				<!-- /.card-heading -->
				<div class="card-info">
					<div class="rating">
						${item.stars}
					</div>
					<div class="price">От ${item.price} ₽</div>
					<div class="category">${item.kitchen}</div>
				</div>
				<!-- /.card-info -->
			</div>
		`;

			a.addEventListener('click', (e) => {
				e.preventDefault();

				localStorage.setItem('restaurant', JSON.stringify(item));
				localStorage.setItem('restaurant-name', item.name);

				if (userLogin) {
					console.log(222);
					window.location.href = a.getAttribute('href');
				} else {
					console.log(111);
					modalAuth.style.display = 'flex';
				}
			})

			cardsRestaurants.append(a);
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
// }


// partners();