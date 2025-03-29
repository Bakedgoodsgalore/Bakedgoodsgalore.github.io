// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const allItems = document.querySelectorAll('.item-card');
    const sections = document.querySelectorAll('.baked-goods-section');
    const subcategories = document.querySelectorAll('.subcategory');
    
    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, show all items and sections
            allItems.forEach(item => {
                item.style.display = 'block';
            });
            
            sections.forEach(section => {
                section.style.display = 'block';
            });
            
            subcategories.forEach(subcategory => {
                subcategory.style.display = 'block';
            });
            
            return;
        }
        
        // Hide all sections initially
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Hide all subcategories initially
        subcategories.forEach(subcategory => {
            subcategory.style.display = 'none';
        });
        
        // Counter for matches
        let matchFound = false;
        
        // Check each item
        allItems.forEach(item => {
            const itemName = item.querySelector('h4').textContent.toLowerCase();
            
            if (itemName.includes(searchTerm)) {
                // Show this item
                item.style.display = 'block';
                
                // Show the parent subcategory
                const parentSubcategory = item.closest('.subcategory');
                if (parentSubcategory) {
                    parentSubcategory.style.display = 'block';
                }
                
                // Show the parent section
                const parentSection = item.closest('.baked-goods-section');
                if (parentSection) {
                    parentSection.style.display = 'block';
                }
                
                matchFound = true;
            } else {
                // Hide this item
                item.style.display = 'none';
            }
        });
        
        // Show a message if no matches found
        const existingNoResults = document.getElementById('no-results-message');
        if (existingNoResults) {
            existingNoResults.remove();
        }
        
        if (!matchFound) {
            const noResults = document.createElement('div');
            noResults.id = 'no-results-message';
            noResults.innerHTML = `
                <div class="no-results">
                    <h3>No results found for "${searchTerm}"</h3>
                    <p>Try a different search term or browse by category.</p>
                    <button id="clear-search" class="btn">Clear Search</button>
                </div>
            `;
            document.querySelector('main').prepend(noResults);
            
            // Add event listener to the clear button
            document.getElementById('clear-search').addEventListener('click', function() {
                searchInput.value = '';
                performSearch();
                noResults.remove();
            });
        }
    }
    
    // Event listeners for search
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // View More buttons functionality
    const viewMoreButtons = document.querySelectorAll('.view-more');
    
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const subcategory = this.closest('.subcategory');
            const itemsGrid = subcategory.querySelector('.items-grid');
            
            // Toggle between showing more and less
            if (this.textContent === 'View More') {
                // Expand the grid to show more items
                itemsGrid.style.maxHeight = 'none';
                this.textContent = 'View Less';
            } else {
                // Collapse the grid back to original size
                itemsGrid.style.maxHeight = '400px';
                this.textContent = 'View More';
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for the sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize the items grid with a max height
    document.querySelectorAll('.items-grid').forEach(grid => {
        grid.style.maxHeight = '400px';
        grid.style.overflow = 'hidden';
    });
    
    // Add hover effect to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});
