/**
 * Универсальная галерея для портфолио
 * Упрощённая версия для гарантированной работы
 */

console.log('gallery.js loaded');

// Создаём модальное окно сразу при загрузке скрипта
(function() {
    console.log('Creating modal immediately');
    
    // Удаляем старое модальное окно, если есть
    const oldModal = document.getElementById('imageModal');
    if (oldModal) {
        oldModal.remove();
        console.log('Removed old modal');
    }
    
    // Создаём новое модальное окно
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        z-index: 1000000;
        cursor: pointer;
    `;
    
    // Кнопка закрытия
    const closeBtn = document.createElement('span');
    closeBtn.id = 'modalClose';
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 35px;
        color: white;
        font-size: 60px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000001;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.5);
        border-radius: 50%;
        line-height: 1;
    `;
    
    // Изображение
    const img = document.createElement('img');
    img.id = 'modalImage';
    img.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border: none;
        box-shadow: 0 0 30px rgba(0,0,0,0.5);
        z-index: 1000000;
    `;
    
    // Кнопка "Предыдущее"
    const prevBtn = document.createElement('div');
    prevBtn.id = 'modalPrev';
    prevBtn.innerHTML = '‹';
    prevBtn.style.cssText = `
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        color: white;
        font-size: 60px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000001;
        width: 60px;
        height: 60px;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.5);
        border-radius: 50%;
        line-height: 1;
    `;
    
    // Кнопка "Следующее"
    const nextBtn = document.createElement('div');
    nextBtn.id = 'modalNext';
    nextBtn.innerHTML = '›';
    nextBtn.style.cssText = `
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        color: white;
        font-size: 60px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000001;
        width: 60px;
        height: 60px;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.5);
        border-radius: 50%;
        line-height: 1;
    `;
    
    // Счётчик
    const counter = document.createElement('div');
    counter.id = 'modalCounter';
    counter.style.cssText = `
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        background: rgba(0,0,0,0.7);
        padding: 10px 20px;
        border-radius: 30px;
        font-size: 16px;
        z-index: 1000001;
        display: none;
    `;
    
    modal.appendChild(closeBtn);
    modal.appendChild(prevBtn);
    modal.appendChild(nextBtn);
    modal.appendChild(img);
    modal.appendChild(counter);
    
    document.body.appendChild(modal);
    console.log('Modal created and appended to body');
})();

// Глобальные переменные
let currentImages = [];
let currentIndex = 0;

// Функция открытия модального окна
window.openModal = function(imgElement) {
    console.log('openModal called', imgElement);
    
    if (!imgElement || !imgElement.src) {
        console.error('Invalid image element');
        return;
    }
    
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    const counter = document.getElementById('modalCounter');
    
    if (!modal || !modalImg) {
        console.error('Modal elements not found!');
        return;
    }
    
    console.log('Modal found, setting image:', imgElement.src);
    
    // Собираем все изображения из галереи
    const gallery = imgElement.closest('.gallery-section, .gallery-grid, .project-content');
    if (gallery) {
        const images = gallery.querySelectorAll('img');
        currentImages = Array.from(images).map(img => img.src);
        currentIndex = currentImages.indexOf(imgElement.src);
        
        if (currentIndex === -1) {
            currentImages = [imgElement.src];
            currentIndex = 0;
        }
    } else {
        currentImages = [imgElement.src];
        currentIndex = 0;
    }
    
    console.log('Images:', currentImages);
    console.log('Index:', currentIndex);
    
    // Устанавливаем изображение
    modalImg.src = currentImages[currentIndex];
    
    // Показываем/скрываем кнопки навигации
    if (currentImages.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        counter.style.display = 'block';
        counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        counter.style.display = 'none';
    }
    
    // Показываем модальное окно
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    console.log('Modal should now be visible');
};

// Закрытие модального окна
window.closeModal = function() {
    console.log('closeModal called');
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

// Навигация
window.changeImage = function(direction) {
    console.log('changeImage called', direction);
    
    if (currentImages.length <= 1) return;
    
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    
    const modalImg = document.getElementById('modalImage');
    const counter = document.getElementById('modalCounter');
    
    if (modalImg) {
        modalImg.src = currentImages[currentIndex];
    }
    
    if (counter) {
        counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    }
};

// Обработчики событий
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - setting up event listeners');
    
    const modal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('modalClose');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    
    if (closeBtn) {
        closeBtn.onclick = function(e) {
            e.stopPropagation();
            closeModal();
        };
    }
    
    if (prevBtn) {
        prevBtn.onclick = function(e) {
            e.stopPropagation();
            changeImage(-1);
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = function(e) {
            e.stopPropagation();
            changeImage(1);
        };
    }
    
    if (modal) {
        // Закрытие по клику на фон
        modal.onclick = function(e) {
            if (e.target === modal) {
                closeModal();
            }
        };
    }
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
        if (e.key === 'ArrowLeft' && modal && modal.style.display === 'block') {
            changeImage(-1);
        }
        if (e.key === 'ArrowRight' && modal && modal.style.display === 'block') {
            changeImage(1);
        }
    });
});