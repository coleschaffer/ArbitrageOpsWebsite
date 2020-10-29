/***** BURGER MENU *****/

function triggerMenu () 
{
    var menu_items = document.getElementById ("menu-items-burger");
    if (menu_items.style.opacity == 1)
    {
        menu_items.style.transition = "opacity 0.6s";
        menu_items.style.opacity = 0;
    } else {
        menu_items.style.transition = "opacity 0.6s";
        menu_items.style.opacity = 1;
    }
}



/**********************/
/** Animated counter **/


function animateValue (node, start, end, duration)
{
    // assumes integer values for start and end
    var range = end - start;
    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50;
    // calc step time to show all interediate values
    var stepTime = Math.abs (Math.floor (duration / range));
    
    // never go below minTimer
    stepTime = Math.max (stepTime, minTimer);
    
    // get current time and calculate desired end time
    var startTime = new Date ().getTime ();
    var endTime = startTime + duration;
    var timer;
  
    function run () 
    {
        let now = new Date ().getTime ();
        let remaining = Math.max ((endTime - now) / duration, 0);
        let value = Math.round (end - (remaining * range));
        node.innerHTML = value;
        if (value == end)
        {
            clearInterval (timer);
        }
    }
    
    timer = setInterval (run, stepTime);
    run ();
}

function animateStatsValues () 
{
	let stat_numbers = document.getElementsByClassName ('stat-value');

	for (let i = 0; i < stat_numbers.length; i++)
	{
		let node = stat_numbers[i];
		let start_from = 0;
		let final_number = node.innerHTML;
		let duration = 2200;
		animateValue (node, start_from, final_number, duration);
	}
}














/******************/
/** Email sender **/

function sendEmailToUser (e) 
{
	e.preventDefault();
    e.stopPropagation();

	const first_name = document.getElementById ('contact_first_name').value;
	const last_name = document.getElementById ('contact_last_name').value;
	const email = document.getElementById ('contact_email').value;
	const subject = "Message from " + first_name + " " + last_name;
	const message_body = document.getElementById ('contact_message').value;
	const message = "-- Received from " + email + " --\n\n" + message_body;

	Email.send({
	    SecureToken : "3c40c39a-c00c-4db5-9363-224abeae994a",
	    To : 'info@arbitrageops.com',
	    From : "arbitrageops.web@gmail.com",
	    Subject : subject,
	    Body : message
	}).then(
	  message => alert (message)
	);

    return false;
}

/******************/

document.addEventListener ("DOMContentLoaded", event => {

	const submit_contact_form = document.getElementById ('submit-contact-form');
	const success_message = "Message sent!"

	const contact_form = document.getElementById ('contact-form');

	if (contact_form != undefined)
		contact_form.addEventListener ('submit', sendEmailToUser);




	/************************/
	/****** Animations ******/

	// We add a "watcher" selector to any element that we want to track
	const SELECTOR = '.watched';

	const ANIMATE_BFT_CLASS_NAME = 'animate-slideBottomFromTop';
	const ANIMATE_IFL_CLASS_NAME = 'animate-slideInFromLeft';
	const ANIMATE_IFR_CLASS_NAME = 'animate-slideInFromRight';
	const ANIMATE_TFP_CLASS_NAME = 'animate-slideTopFromBottom';

	const animate = (element, class_name) => (
	    element.classList.add (class_name)
	);

	const isAnimated = element => (
	  element.classList.contains (ANIMATE_BFT_CLASS_NAME) ||
	  element.classList.contains (ANIMATE_IFL_CLASS_NAME) ||
	  element.classList.contains (ANIMATE_IFR_CLASS_NAME) ||
	  element.classList.contains (ANIMATE_TFP_CLASS_NAME)
	);

	const id_about_intro = "about-intro";
	const id_boxes_overflow_container = "boxes-overflow-container";
	const id_offer = "offer";
	const id_success_img_container = "success-img-container";
	const id_success_stats = "success-stats-squares-container";
	const id_testimonials = "testimonials";
	const id_contact_form = "contact-form";
	const id_contact_info_box = "contact-info-box";
	const id_products_feed_container = "products-feed-container";

	const intersectionObserver = new IntersectionObserver ((entries, observer) => 
	{
	  entries.forEach ((entry) => {  
	    // When element's is in viewport, animate it.
	    if (entry.intersectionRatio > 0) 
	    {
	        switch (entry.target.id) 
	        {
	            case id_about_intro:
	                animate (entry.target, ANIMATE_IFL_CLASS_NAME);
	                break;
	            case id_boxes_overflow_container:
	                animate (entry.target, ANIMATE_IFR_CLASS_NAME);
	                break;
	            case id_offer:
	                animate (entry.target, ANIMATE_TFP_CLASS_NAME);
	                break;
	            case id_success_img_container:
	            	animate (entry.target, ANIMATE_BFT_CLASS_NAME);
	            	break;
	            case id_success_stats:
					animateStatsValues ();
					break;
				case id_testimonials:
					animate (entry.target, ANIMATE_TFP_CLASS_NAME);
					break;
				case id_contact_form:
					animate (entry.target, ANIMATE_IFL_CLASS_NAME);
					break;
				case id_contact_info_box:
					animate (entry.target, ANIMATE_IFR_CLASS_NAME);
					break;
				case id_products_feed_container:
					animate (entry.target, ANIMATE_TFP_CLASS_NAME);
					break;
	            default: 
	                animate (entry.target, ANIMATE_IFR_CLASS_NAME);
	        }
	      
	      console.log (entry.target.id)
	      // Remove observer after animation
	      observer.unobserve (entry.target);
	    }
	  });
	});

	// Get only these elements, which are not animated yet.
	const elements = [].filter.call(
	  document.querySelectorAll (SELECTOR),
	  element => !isAnimated (element)
	);
	//console.log(elements);

	// Start observing the elements.
	elements.forEach ((element) => intersectionObserver.observe(element));
	
});