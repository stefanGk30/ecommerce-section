const modal = get('.modal');
const desktopMainImg = get('.main-img');
const mainImgCont = get('.main-image');
const modalMainImg = get('.main-modal');
const closeModalBtn = get('.modal-close-btn');
const prevImagesCont = get('.modal-preview-imgs');
const modalNext = get('.modal-next-btn');
const modalPrev = get('.modal-prev-btn');
const desktopPrevImgs = document.querySelectorAll('.prev-img-container');
const modalImages = document.querySelectorAll('.modal-preview-image-wrapper');

desktopPrevImgs.forEach((img) => {
  img.addEventListener('click', () => {
    const id = img.firstElementChild.dataset.id;
    desktopPrevImgs.forEach((img) => img.classList.remove('active'));
    img.classList.add('active');
    mainImgCont.innerHTML = `
              <img
              src="./images/image-product-${id}.jpg"
              class="main-img img"
              data-id="${id}"
              />
    `;
  });
});

closeModalBtn.addEventListener('click', () => {
  closeModal();
});
modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeModal();
  }
});

mainImgCont.addEventListener('click', (e) => {
  modal.classList.add('open-modal');
  modalMainImg.src = e.target.src;
  const id = parseInt(e.target.dataset.id);
  modalImages.forEach((img, i) => {
    if (id === i + 1) {
      img.classList.add('selected');
    }
  });
});

prevImagesCont.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  modalImages.forEach((imgWrap) => imgWrap.classList.remove('selected'));
  const wrapper = e.target.parentElement;
  wrapper.classList.add('selected');
  modalMainImg.src = `./images/image-product-${id}.jpg `;
});

modalNext.addEventListener('click', next);
modalPrev.addEventListener('click', prev);

//---------------------------------- functions

function closeModal() {
  modal.classList.remove('open-modal');
  modalImages.forEach((wrap) => wrap.classList.remove('selected'));
}

function next() {
  const selected = prevImagesCont.querySelector('.selected');
  selected.classList.remove('selected');
  const next = selected.nextElementSibling || modalImages[0];
  next.classList.add('selected');
  const id = next.firstElementChild.dataset.id;
  modalMainImg.src = `./images/image-product-${id}.jpg `;
}
function prev() {
  const selected = prevImagesCont.querySelector('.selected');
  selected.classList.remove('selected');
  const prev =
    selected.previousElementSibling || prevImagesCont.lastElementChild;
  prev.classList.add('selected');
  const id = prev.firstElementChild.dataset.id;
  modalMainImg.src = `./images/image-product-${id}.jpg `;
}

//------------------------------------------
// mobile

const toggleMenu = get('.bars-btn');
const closeMenu = get('.close-side-menu');
const sideMenu = get('.side-menu-container');

const nextSlide = get('.next-btn');
const prevSlide = get('.prev-btn');
const mobImages = document.querySelectorAll('.mob-img');

let counter = 0;

mobImages.forEach((img, i) => {
  img.style.left = `${100 * i}%`;
});

nextSlide.addEventListener('click', () => {
  counter++;
  slide();
});
prevSlide.addEventListener('click', () => {
  counter--;
  slide();
});

function slide() {
  if (counter < 0) {
    counter = mobImages.length - 1;
  }
  if (counter > mobImages.length - 1) {
    counter = 0;
  }

  mobImages.forEach((img) => {
    img.style.transform = `translateX(-${counter * 100}%)`;
  });
}

toggleMenu.addEventListener('click', () => {
  sideMenu.classList.add('show-menu');
});

closeMenu.addEventListener('click', () => {
  sideMenu.classList.remove('show-menu');
});

// "cart"
let itemAmount = 0;
let cartAmount = 0;

function get(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  } else {
    throw new Error('check selection!!!!');
  }
}
const cart = get('.cart');
const cartBtn = get('.cart-btn');
const cartItemAmountSpan = get('.amount');
const addToCartBtn = get('.add-btn');
const decAmount = get('.dec-btn');
const incAmount = get('.inc-btn');
const amountInfo = get('.product-amount');

const checkoutBtn = get('.checkout-btn');
const cartContainer = get('.cart-product');

cartBtn.addEventListener('click', () => {
  cart.classList.toggle('show-cart');
});

incAmount.addEventListener('click', () => {
  itemAmount++;
  amountInfo.textContent = itemAmount;
  addToCartBtn.classList.add('solid');
});
decAmount.addEventListener('click', () => {
  itemAmount--;
  if (itemAmount <= 0) {
    itemAmount = 0;
    addToCartBtn.classList.remove('solid');
  }
  amountInfo.textContent = itemAmount;
});

addToCartBtn.addEventListener('click', addToCart);

function addToCart() {
  cartAmount += itemAmount;
  cartContainer.innerHTML = `
           <div class="cart-item">
              <img
                src="./images/image-product-1-thumbnail.jpg"
                alt=""
                class="cart-item-img"
              />
              <div class="item-info">
                <p class="item-name">Fall Limited Edition Sneakers</p>
                <p class="item-price">
                  $125.00 x <span class="item-amount">3</span>
                  <span class="total-price">$375.00</span>
                </p>
              </div>
              <button class="remove-item btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
  `;

  checkoutBtn.style.display = 'block';
  cartItemAmountSpan.textContent = itemAmount;
  cartItemAmountSpan.classList.add('show-amount');

  const cartTotalPrice = get('.total-price');
  const cartItemAmount = get('.item-amount');
  updateValues(cartItemAmount, cartTotalPrice);
  //
  const removeItemBtn = get('.remove-item');
  removeItemBtn.addEventListener('click', () => {
    cartAmount = 0;
    cartContainer.innerHTML = ' <h3>Cart is empty.</h3>';
    checkoutBtn.style.display = 'none';
    cartItemAmountSpan.textContent = cartAmount;
    cartItemAmountSpan.classList.remove('show-amount');
  });
  //
  addToCartBtn.classList.remove('solid');
  cart.classList.add('show-cart');
}

function updateValues(amount, total) {
  cartItemAmountSpan.textContent = cartAmount;
  amount.textContent = cartAmount;
  total.textContent = ` $${cartAmount * 125}.00`;
  amountInfo.textContent = '0';
  itemAmount = 0;
}
