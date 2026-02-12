document.addEventListener('DOMContentLoaded', () => {
    // Select all tree items
    const treeItems = document.querySelectorAll('.tree-item');

    treeItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Check if this item has a nested list (uL) immediately following it in the same LI
            const parentLi = item.parentElement;
            const nestedUl = parentLi.querySelector('ul');
            const icon = item.querySelector('i.fa-caret-right, i.fa-caret-down');

            if (nestedUl) {
                // Toggle expansion
                if (nestedUl.style.display === 'none' || parentLi.classList.contains('collapsed')) {
                    // Expand
                    nestedUl.style.display = 'block';
                    parentLi.classList.remove('collapsed');
                    parentLi.classList.add('expanded');
                    if (icon) {
                        icon.classList.remove('fa-caret-right');
                        icon.classList.add('fa-caret-down');
                    }
                } else {
                    // Collapse
                    nestedUl.style.display = 'none';
                    parentLi.classList.remove('expanded');
                    parentLi.classList.add('collapsed');
                    if (icon) {
                        icon.classList.remove('fa-caret-down');
                        icon.classList.add('fa-caret-right');
                    }
                }
            } else {
                // Leaf node (actual page/action) selection
                // Remove 'selected' class from all other li's
                document.querySelectorAll('.sidebar li.selected').forEach(el => el.classList.remove('selected'));
                // Add 'selected' to this li
                parentLi.classList.add('selected');

                // "Assigning" buttons - simulated action
                const text = item.textContent.trim();
                console.log(`Navigating to: ${text}`);
                
                // Add a new tab if it doesn't exist (Visual feedback)
                addTab(text);
            }
        });
    });

    // Initialize state based on HTML classes
    document.querySelectorAll('.sidebar li').forEach(li => {
        const nestedUl = li.querySelector('ul');
        const icon = li.querySelector('.tree-item > i.fa-caret-right, .tree-item > i.fa-caret-down');
        
        if (nestedUl) {
            if (li.classList.contains('collapsed')) {
                nestedUl.style.display = 'none';
                if (icon) {
                    icon.classList.remove('fa-caret-down');
                    icon.classList.add('fa-caret-right');
                }
            } else {
                nestedUl.style.display = 'block'; // Ensure expanded are visible
                if (icon) {
                    icon.classList.remove('fa-caret-right');
                    icon.classList.add('fa-caret-down');
                }
            }
        }
    });
});

// Helper to add a tab dynamically for visual feedback
function addTab(title) {
    const tabsBar = document.querySelector('.tabs-bar');
    
    // Check if tab already exists
    const existingTabs = Array.from(tabsBar.children);
    const exists = existingTabs.find(tab => tab.textContent.includes(title));
    
    // Reset active state
    existingTabs.forEach(t => t.classList.remove('active'));
    existingTabs.forEach(t => t.classList.add('inactive'));

    if (exists) {
        exists.classList.remove('inactive');
        exists.classList.add('active');
    } else {
        const newTab = document.createElement('div');
        newTab.className = 'tab active';
        newTab.innerHTML = `${title} <i class="fa-solid fa-xmark"></i>`;
        tabsBar.appendChild(newTab);
        
        // Simple close logic for the new tab
        newTab.querySelector('i').addEventListener('click', (e) => {
            e.stopPropagation();
            newTab.remove();
        });
    }
}
