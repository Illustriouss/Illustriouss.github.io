let finished = 0;
let total = 0;
let today = 0;
let important = 0;

let actionList = {
	"toggle-popup": ["main-popup","hidden"],
	"toggle-menu": ["menu", "menu-open"]
};

$('.btn').on('click', () => {
	let classList = event.currentTarget.className.split(' ');
	let jsClassName;

	$.each(classList, function(index, className) {
		if (className.match("^js-")) {
			jsClassName = className.replace("js-", "");
		}
	});

	if (actionList[jsClassName]) {
		$(".js-" + actionList[jsClassName][0]).toggleClass("js-" + actionList[jsClassName][1]);
	}
});

$('.js-add-item').on('click', () => {
		
	if ($("#newToDo").val()) {

		total += 1;
		let importantStyling = "";

		if ($("#newImportant").is(':checked')) {

			important += 1;
			importantStyling = "item--danger";
		}

		$(".finished").text(finished);
		$(".total").text(total);
		$(".today").text(today);
		$(".important").text(important);

		$('.list__info').show();
		$('.js-no-items').hide();
		$('.js-main-popup').toggleClass("js-hidden");
	
		$('.list__active').append("<div class='item "
		+ importantStyling 
		+ "'><div class='item__icon'></div><div class='item__info'><div class='item__text'>" 
		+ $('#newToDo').val() + "</div><div class='item__text item__text--stubtle'>" 
		+ $('#newPlace').val() + "</div></div><div class='item__handle'><div class='btn js-done-item'><i class='fa fa-check' aria-hidden='true'></i></div><div class='btn js-delete-item'><i class='fa fa-times' aria-hidden='true'></i></div></div></div>");

	}
});

$(".list__name").on('click', 'i', () => {
	$('.list__name--edit').show()
						.val($(".list__name").text().trim())
						.focus();
	$(".list__name").hide();
});

$(".list__name--edit").keydown(function(event) {
	if (event.which == 13) {
		$('.list__name').text($(".list__name--edit").val().trim())
						.append(" <i class='fa fa-pencil' aria-hidden='true'></i>")
						.show();
		$('.list-group__elem--active').text($(".list__name--edit").val().trim())
		$('.list__name--edit').hide();
	}
});

$('.list__active').on('click', '.js-delete-item', (event) => {
	let thisItem = event.currentTarget.closest(".item");
	let classList = thisItem.className.split(' ');
	console.log(classList);
	$.each(classList, function(index, className) {
		if (className == "item--danger") {
			important -= 1;
		}
		if (className == "item--alert") {
			today -= 1;
		}
		if (className == "item--done") {
			finished -= 1;
		}
	});

	$(".finished").text(finished);
	$(".total").text(total -= 1);
	$(".today").text(today);
	$(".important").text(important);

	thisItem.remove();
});	

$('.list__active').on('click', '.js-done-item', (event) => {
	let thisItem = event.currentTarget.closest(".item");
	if ($(thisItem).hasClass("item--done")) {
		$(".finished").text(finished -= 1);
	} else {
		$(".finished").text(finished += 1);
	}
	$(thisItem).toggleClass("item--done");
}); 