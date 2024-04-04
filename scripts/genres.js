import { getMoviesByGenre } from "../api/api-config.js";

const params = new URLSearchParams(window.location.search);
let numberOfItems;
let totalPages;
let isAdded = false;
const id = params.get('id');
let page = 1;
const container = document.querySelector('.container');


let limitPerPage = 20; 
$('#page .list-group:gt(' + (limitPerPage - 1) + ')').hide(); // Hide all items over page limits (e.g., 5th item, 6th item, etc.)
 // Get number of pages
$(".pagination").append("<li class='current-page active'><a href='javascript:void(0)'>" + 1 + "</a></li>"); // Add first page marker



// Function that displays new items based on page number that was clicked
$(".pagination li.current-page").on("click", function() {
  // Check if page number that was clicked on is the current page that is being displayed
  if ($(this).hasClass('active')) {
    return false; // Return false (i.e., nothing to do, since user clicked on the page number that is already being displayed)
  } else {
    let currentPage = $(this).index(); // Get the current page number
    $(".pagination li").removeClass('active'); // Remove the 'active' class status from the page that is currently being displayed
    $(this).addClass('active'); // Add the 'active' class status to the page that was clicked on
    // $("#page .list-group").hide();     // Hide all items in loop, this case, all the list groups
    let grandTotal = limitPerPage * currentPage; // Get the total number of items up to the page number that was clicked on

    // Loop through total items, selecting a new set of items based on page number
    /* for (let i = grandTotal - limitPerPage; i < grandTotal; i++) {
      $("#page .list-group:eq(" + i + ")").show(); // Show items from the new page that was selected
    } */
  }
});

// Function to navigate to the next page when users click on the next-page id (next page button)


// Function to navigate to the previous page when users click on the previous-page id (previous page button)


const getGenre = async () => {
  try {
    console.log(page)
    let moviesByPage = await getMoviesByGenre(id, page);
    totalPages = moviesByPage.total_pages;
    if(totalPages > 20){
      totalPages = 20;
    }
    if (moviesByPage.results && !isAdded) {
      addAllPages(moviesByPage.results.length);
    }
    if(moviesByPage.results){
      container.innerHTML = '';
      moviesByPage.results.forEach(movie => {
        container.innerHTML += `${movie.original_title} | ${movie.vote_average}<br>`
      });
    }
  } catch (error) {
    console.error('Error fetching genre:', error);
  }
};

function showNextPage(){
  let currentPage = $(".pagination li.active").index();
  if (currentPage === totalPages) {
    return false;
  } else {
    currentPage++;
    page = currentPage;
    $(".pagination li").removeClass('active');

    getGenre(page);
    // Loop through total items, selecting a new set of items based on page number
    /* for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
      $("#page .list-group:eq(" + i + ")").show(); // Show items from the new page that was selected
    }
 */
    $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass('active'); // Make new page number the 'active' page
  }
}

function addAllPages(moviePageCount){
  numberOfItems = moviePageCount;
  for (let i = 2; i <= totalPages; i++) {
    $(".pagination").append("<li class='current-page'><a href='javascript:void(0)'>" + i + "</a></li>");
  }
  $(".pagination").append("<li id='next-page'><a href='javascript:void(0)' aria-label=Next><span aria-hidden=true>&raquo;</span></a></li>");
  $("#next-page").on("click", showNextPage);
  $("#previous-page").on("click", showPreviousPage);
  isAdded = true;
}

function showPreviousPage(){
  let currentPage = $(".pagination li.active").index(); // Identify the current active page
  // Check to make sure that users is not on page 1 and attempting to navigating to a previous page
  if (currentPage === 1) {
    return false; // Return false (i.e., cannot navigate to a previous page because the current page is page 1)
  } else {
    currentPage--; // Decrement page by one
    page = currentPage;
    getGenre(page);
      $(".pagination li").removeClass('active'); // Remove the 'activate' status class from the previous active page number
      $("#page .list-group").hide(); // Hide all items in the pagination loop
      var grandTotal = limitPerPage * currentPage; // Get the total number of items up to the page that was selected
  
      // Loop through total items, selecting a new set of items based on page number
      for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
        $("#page .list-group:eq(" + i + ")").show(); // Show items from the new page that was selected
      }
  
      $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass('active'); // Make new page number the 'active' page
    }
}

getGenre(page)
