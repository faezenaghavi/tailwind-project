const tabs=document.querySelectorAll('.tab');
const panels=document.querySelectorAll('.panel');

tabs.forEach((item )=> item,addEventListener('click',onTabClick));

 function onTabClick(e){
    tabs.forEach((item)=>{
        item.children[0].classList.remove('border-b-4')
    })
    panels.forEach((item)=>item.classList.add('hidden'))

    e.target.classList.add('border-gray-400')

    const clasString= e.target.getAttribute('data-target')

    document.getElementById('panels').getElementsByClassName(clasString)[0]
    .classList.remove('hidden');
 }
 
// سیستم سبد خرید
let cart = [];
let cartTotal = 0;

// اضافه کردن محصول به سبد خرید
function addToCart(id, name, price, image) {
    // بررسی اینکه آیا محصول قبلاً در سبد خرید وجود دارد
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${name} به سبد خرید اضافه شد!`);
}

// نمایش سبد خرید
function showCart() {
    const cartBox = document.getElementById('cartBox');
    cartBox.classList.remove('opacity-0', 'invisible');
    cartBox.classList.add('opacity-100', 'visible');
}

// بستن سبد خرید
function closeCart() {
    const cartBox = document.getElementById('cartBox');
    cartBox.classList.add('opacity-0', 'invisible');
    cartBox.classList.remove('opacity-100', 'visible');
}

// حذف محصول از سبد خرید
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
}

// تغییر تعداد محصول
function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartDisplay();
        }
    }
}

// خالی کردن سبد خرید
function clearCart() {
    cart = [];
    updateCartDisplay();
    showNotification('سبد خرید خالی شد!');
}

// نهایی کردن خرید
function checkout() {
    if (cart.length === 0) {
        showNotification('سبد خرید خالی است!');
        return;
    }
    
    showNotification('سفارش شما با موفقیت ثبت شد!');
    clearCart();
    closeCart();
}

// به‌روزرسانی نمایش سبد خرید
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartCountMobile = document.getElementById('cartCountMobile');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // به‌روزرسانی تعداد محصولات
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // به‌روزرسانی دسکتاپ
    if (cartCount) cartCount.textContent = totalItems;
    
    // به‌روزرسانی موبایل
    if (cartCountMobile) cartCountMobile.textContent = totalItems;
    
    // به‌روزرسانی مجموع قیمت
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `${cartTotal.toLocaleString()} تومان`;
    
    // نمایش محصولات
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-gray-400">سبد خرید خالی است</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#1a1c1e] rounded-lg gap-4">
            <div class="flex items-center gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover">
                <div class="text-center sm:text-right">
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-gray-400">${item.price.toLocaleString()} تومان</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="changeQuantity('${item.id}', -1)" class="bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-colors">-</button>
                <span class="w-8 text-center">${item.quantity}</span>
                <button onclick="changeQuantity('${item.id}', 1)" class="bg-green-500 text-white w-8 h-8 rounded-full hover:bg-green-600 transition-colors">+</button>
                <button onclick="removeFromCart('${item.id}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-sm">حذف</button>
            </div>
        </div>
    `).join('');
}

// نمایش اعلان
function showNotification(message, durationMs = 3000) {
	// ایجاد عنصر اعلان
	const notification = document.createElement('div');
	notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
	notification.textContent = message;
	
	document.body.appendChild(notification);
	
	// نمایش اعلان
	setTimeout(() => {
		notification.classList.remove('translate-x-full');
	}, 100);
	
	// حذف اعلان بعد از مدت مشخص
	setTimeout(() => {
		notification.classList.add('translate-x-full');
		setTimeout(() => {
			document.body.removeChild(notification);
		}, 300);
	}, durationMs);
}

// کنترل نمایش باکس فرم
function showForm() {
    const formBox = document.getElementById('formBox');
    formBox.classList.remove('opacity-0', 'invisible');
    formBox.classList.add('opacity-100', 'visible');
}

function closeForm() {
    const formBox = document.getElementById('formBox');
    formBox.classList.add('opacity-0', 'invisible');
    formBox.classList.remove('opacity-100', 'visible');
}

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeForm');
    const closeCartBtn = document.getElementById('closeCart');
    
    // بستن فرم با کلیک روی دکمه بستن
    closeBtn.addEventListener('click', closeForm);
    
    // بستن سبد خرید با کلیک روی دکمه بستن
    closeCartBtn.addEventListener('click', closeCart);
    
    // بستن فرم با کلیک روی پس‌زمینه
    const formBox = document.getElementById('formBox');
    formBox.addEventListener('click', function(e) {
        if (e.target === formBox) {
            closeForm();
        }
    });
	// ثبت نام کاربر
	const registerForm = document.querySelector('#formBox form');
	if (registerForm) {
		registerForm.addEventListener('submit', function(e) {
			e.preventDefault();
			const nameInput = document.getElementById('name');
			const userName = nameInput ? nameInput.value.trim() : '';
			if (userName) {
				showNotification(`${userName} با موفقیت ثبت شد`, 5000);
			} else {
				showNotification('ثبت نام انجام شد', 10000);
			}
		});
	}
    // بستن سبد خرید با کلیک روی پس‌زمینه
    const cartBox = document.getElementById('cartBox');
    cartBox.addEventListener('click', function(e) {
        if (e.target === cartBox) {
            closeCart();
        }
    });
    
    // بستن فرم با کلید Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!formBox.classList.contains('invisible')) {
                closeForm();
            }
            if (!cartBox.classList.contains('invisible')) {
                closeCart();
            }
        }
    });
    
    // منوی موبایل
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // بستن منوی موبایل با کلیک روی لینک‌ها
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // به‌روزرسانی اولیه سبد خرید
    updateCartDisplay();
});
 
