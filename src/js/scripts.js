//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    // const mainNav = document.body.querySelector('#mainNav');
    // if (mainNav) {
    //     new bootstrap.ScrollSpy(document.body, {
    //         target: '#mainNav',
    //         offset: 74,
    //     });
    // };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Handle any of the .joinWaitlistForm forms submission, which we will send with Netlify. On success, show the thank you message in submitSuccessMessage - on error show the error in submitErrorMessage
    const joinWaitlistForms = [].slice.call(
        document.querySelectorAll('.joinWaitlistForm')
    );
    joinWaitlistForms.map(function (joinWaitlistForm) {
        joinWaitlistForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const form = event.target;
            const submitButton = form.querySelector('button[type="submit"]');
            const submitSuccessMessage = form.querySelector('.submitSuccessMessage');
            const submitErrorMessage = form.querySelector('.submitErrorMessage');
            const submitErrorMessageText = submitErrorMessage.innerText;

            const formData = new FormData(form);

            submitButton.disabled = true;
            submitSuccessMessage.classList.add('d-none');
            submitErrorMessage.classList.add('d-none');
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    submitButton.disabled = false;
                    form.reset();
                    submitSuccessMessage.classList.remove('d-none');
                    // Emit a gtag event generate_lead
                    gtag('event', 'generate_lead');
                })
                .catch((error) => {
                    submitButton.disabled = false;
                    submitErrorMessageText.textContent = error;
                    submitErrorMessage.classList.remove('d-none');
                });

        });
    });

});
