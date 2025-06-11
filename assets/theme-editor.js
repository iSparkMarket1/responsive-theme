function hideProductModal() {
  const productModal = document.querySelectorAll('product-modal[open]');
  productModal && productModal.forEach((modal) => modal.hide());
}

document.addEventListener('shopify:block:select', function (event) {
  hideProductModal();
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();

  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft,
    });
  }, 200);
});

document.addEventListener('shopify:block:deselect', function (event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});

document.addEventListener('shopify:section:load', () => {
  hideProductModal();
  const zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (!zoomOnHoverScript) return;
  if (zoomOnHoverScript) {
    const newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});

document.addEventListener('shopify:section:reorder', () => hideProductModal());

document.addEventListener('shopify:section:select', () => hideProductModal());

document.addEventListener('shopify:section:deselect', () => hideProductModal());

document.addEventListener('shopify:inspector:activate', () => hideProductModal());

document.addEventListener('shopify:inspector:deactivate', () => hideProductModal());

document.addEventListener("DOMContentLoaded", function () {
  const qtyInput = document.querySelector('input[name="quantity"]');
  const priceElement = document.querySelector('.price-item--sale.price-item--last');

  function updatePriceDisplay() {
    const qty = parseInt(qtyInput.value);
    let unitPrice = 2.5;

    if (qty >= 11) {
      unitPrice = 2.0;
    } else if (qty >= 6) {
      unitPrice = 2.25;
    }

    const totalPrice = unitPrice * qty;

    if (priceElement) {
      priceElement.innerText = `${totalPrice.toFixed(2)} kr`;
    }
  }

  if (qtyInput && priceElement) {
    qtyInput.addEventListener("change", updatePriceDisplay);
    qtyInput.addEventListener("input", updatePriceDisplay);
    updatePriceDisplay(); // Load पर भी दिखाओ
  }
});
