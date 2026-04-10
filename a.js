


function doSearch(el) {
    try {
        var val = el.value.toLowerCase().replace(/İ/g, 'i').replace(/I/g, 'ı').trim();
        var box = document.getElementById('mainMenuContainer');
        if (!box) return;

        var items = box.querySelectorAll('.menu-item');
        var lists = box.querySelectorAll('.sub-menu-list');
        var debug = document.getElementById('search-debug');

        if (val === '') {
            items.forEach(function (i) {
                i.classList.remove('search-hidden', 'search-match');
                i.style.display = i.classList.contains('admin-hidden') ? 'none' : '';
            });
            lists.forEach(function (l) { l.style.display = ''; });
            el.style.borderColor = '#ccc';
            if (debug) debug.innerText = '';
            return;
        }

        var count = 0;
        // Reset all first
        items.forEach(function (i) {
            i.classList.add('search-hidden');
            i.style.display = '';
        });

        items.forEach(function (item) {
            // MATCH LOGIC + ADMIN VISIBILITY CHECK
            if (item.classList.contains('admin-hidden')) return;

            var txt = item.textContent.toLowerCase().replace(/İ/g, 'i').replace(/I/g, 'ı');
            if (txt.indexOf(val) > -1) {
                count++;
                item.classList.remove('search-hidden');
                item.classList.add('search-match');

                // Walk up to show parents
                var p = item.parentElement;
                while (p && p !== box) {
                    if (p.classList.contains('menu-item')) {
                        // Parents shouldn't be hidden by Admin if children are visible, 
                        // but normally Admin would hide the whole branch.
                        if (!p.classList.contains('admin-hidden')) {
                            p.classList.remove('search-hidden');
                            p.classList.add('open');
                        }
                    }
                    if (p.classList.contains('sub-menu-list')) {
                        p.style.display = 'block';
                    }
                    p = p.parentElement;
                }
            }
        });

        el.style.borderColor = count > 0 ? 'green' : 'red';
        if (debug) {
            debug.innerText = count + ' bul';
            debug.style.color = count > 0 ? 'green' : 'red';
        }
    } catch (e) {
        alert(e);
    }
}


function addMovementRow() {
    const tbody = document.getElementById('hareketler-body');
    const rowCount = tbody.children.length + 1;
    const row = document.createElement('tr');
    row.onclick = function () { selectMovementRow(this); };
    row.style.color = '#000';
    row.style.cursor = 'pointer';
    row.innerHTML = `
                            <td class="row-index" style="border:1px solid #d1d5db;padding:2px;text-align:center;background:#f8f9fa;">${rowCount}</td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" style="width:100px;border:none;outline:none;font-size:11px;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" style="width:80px;border:none;outline:none;font-size:11px;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" style="width:200px;border:none;outline:none;font-size:11px;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="0,00" style="width:60px;border:none;outline:none;font-size:11px;text-align:right;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="ADET" style="width:50px;border:none;outline:none;font-size:11px;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="0,00" style="width:60px;border:none;outline:none;font-size:11px;text-align:right;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="ADET" style="width:50px;border:none;outline:none;font-size:11px;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="0,00" style="width:70px;border:none;outline:none;font-size:11px;text-align:right;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="0,00" style="width:70px;border:none;outline:none;font-size:11px;text-align:right;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><select style="width:80px;border:none;outline:none;font-size:11px;background:transparent;"><option>KDV Dahil</option><option>KDV Hariç</option></select></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="0,00" style="width:70px;border:none;outline:none;font-size:11px;text-align:right;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="0,00" style="width:70px;border:none;outline:none;font-size:11px;text-align:right;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="0,00" style="width:80px;border:none;outline:none;font-size:11px;text-align:right;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="0,00" style="width:80px;border:none;outline:none;font-size:11px;text-align:right;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" style="width:100px;border:none;outline:none;font-size:11px;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;text-align:center;">TL</td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="1,00" style="width:60px;border:none;outline:none;font-size:11px;text-align:right;background:transparent;"></td>
                            <td style="border:1px solid #d1d5db;padding:2px;"><input type="text" value="1,00" style="width:60px;border:none;outline:none;font-size:11px;text-align:right;background:transparent;"></td>
                        `;
    tbody.appendChild(row);
}

let selectedMovementRowElem = null;
function selectMovementRow(elem) {
    if (selectedMovementRowElem) {
        selectedMovementRowElem.style.background = 'transparent';
    }
    selectedMovementRowElem = elem;
    selectedMovementRowElem.style.background = '#e2e8f0';
}

function deleteSelectedMovementRow() {
    if (selectedMovementRowElem) {
        selectedMovementRowElem.remove();
        selectedMovementRowElem = null;
        reindexMovementRows();
    }
}

function reindexMovementRows() {
    const tbody = document.getElementById('hareketler-body');
    Array.from(tbody.children).forEach((row, index) => {
        const cell = row.querySelector('.row-index');
        if (cell) cell.innerText = index + 1;
    });
}

function addConnectionRow() {
    const tbody = document.getElementById('baglantilar-body');
    const row = document.createElement('tr');
    row.innerHTML = `
                            <td style="border:1px solid #ccc;padding:2px;text-align:center;"><i class="bi bi-trash" style="cursor:pointer;" onclick="this.closest('tr').remove()"></i></td>
                            <td style="border:1px solid #ccc;padding:2px;"><input type="text" style="width:100%;border:none;outline:none;font-size:11px;min-width:0;"></td>
                            <td style="border:1px solid #ccc;padding:2px;"><input type="date" style="width:100%;border:none;outline:none;font-size:11px;min-width:0;"></td>
                            <td style="border:1px solid #ccc;padding:2px;"><input type="text" style="width:100%;border:none;outline:none;font-size:11px;min-width:0;"></td>
                        `;
    tbody.appendChild(row);
}




// Start with one row
document.addEventListener('DOMContentLoaded', function () {
    // addMovementRow(); // Commented out to keep hardcoded data
    addConnectionRow();
    // open genal by default
    openInvoiceTab('genel');
});

function openInvoiceTab(tabName) {
    // Hide all contents
    const contents = ['genel', 'adres', 'ekbilgiler', 'iskontolar', 'pazarlama', 'not', 'ozeltanimlar', 'fiyatdegistirme', 'baglantilar', 'crm'];
    contents.forEach(t => {
        const el = document.getElementById('tab-content-' + t);
        if (el) {
            el.style.removeProperty('display');
            el.style.display = 'none';
            el.classList.remove('active');
        }
    });

    // Reset all headers
    const headers = ['genel', 'adres', 'ekbilgiler', 'iskontolar', 'pazarlama', 'not', 'ozeltanimlar', 'fiyatdegistirme', 'baglantilar', 'crm'];
    headers.forEach(t => {
        const el = document.getElementById('tab-header-' + t);
        if (el) {
            el.style.backgroundColor = '#e9ecef';
            el.style.borderBottom = '1px solid #cfd6df';
            el.style.fontWeight = 'normal';
            el.style.color = '#666';
        }
    });

    // Show selected content
    const content = document.getElementById('tab-content-' + tabName);
    if (content) {
        content.style.setProperty('display', 'flex', 'important');
        content.classList.add('active');
    }

    // Highlight selected header
    const header = document.getElementById('tab-header-' + tabName);
    if (header) {
        header.style.backgroundColor = '#fff';
        header.style.borderBottom = '1px solid #fff';
        header.style.fontWeight = '700';
        header.style.color = '#333';
    }
}

// Removed updateInvoiceScale and showView override

function toggleInvoiceDropdown(id) {
    const dropdown = document.getElementById(id);
    const trigger = event.currentTarget; // Get the button that triggered the click

    // Close Kayıt Bilgileri if open
    const kayitPopup = document.getElementById('kayit-bilgileri-popup');
    if (kayitPopup) kayitPopup.style.display = 'none';

    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        dropdown.style.top = '';
        dropdown.style.left = '';
        dropdown.style.right = '';
    } else {
        // Close all others
        const dropdowns = document.getElementsByClassName("invoice-dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('show');
            dropdowns[i].style.top = '';
            dropdowns[i].style.left = '';
            dropdowns[i].style.right = '';
        }

        // Mobile positioning logic
        if (window.innerWidth <= 900) {
            const rect = trigger.getBoundingClientRect();
            const isUpward = dropdown.classList.contains('upward');

            if (isUpward) {
                dropdown.style.top = 'auto';
                dropdown.style.bottom = (window.innerHeight - rect.top + 5) + 'px';
            } else {
                dropdown.style.top = (rect.bottom + 5) + 'px';
                dropdown.style.bottom = 'auto';
            }

            // Check if it should align to left or right based on screen position
            if (rect.left + 160 > window.innerWidth) {
                dropdown.style.right = (window.innerWidth - rect.right) + 'px';
                dropdown.style.left = 'auto';
            } else {
                dropdown.style.left = rect.left + 'px';
                dropdown.style.right = 'auto';
            }
        }

        dropdown.classList.add("show");
    }
}

function toggleKayitBilgileri(event) {
    if (event) event.stopPropagation();
    const popup = document.getElementById('kayit-bilgileri-popup');
    if (!popup) return;

    // Close all invoice dropdowns first
    const dropdowns = document.getElementsByClassName("invoice-dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove('show');
    }

    if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}

// Close the dropdown if the user clicks outside of it
document.addEventListener('click', function (event) {
    // Don't close if clicking inside the dropdown content or the trigger button
    if (!event.target.closest('.invoice-dropdown') && !event.target.closest('.invoice-dropdown-content') && !event.target.closest('#kayit-bilgileri-popup')) {
        const dropdowns = document.getElementsByClassName("invoice-dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                openDropdown.style.top = '';
                openDropdown.style.left = '';
                openDropdown.style.right = '';
                openDropdown.style.bottom = '';
            }
        }
        const kayitPopup = document.getElementById('kayit-bilgileri-popup');
        if (kayitPopup) kayitPopup.style.display = 'none';
    }
});


function openTeklifTab(tabName) {
    const contents = ['cari', 'teklifbilgileri', 'ekbilgiler1', 'iskontolar', 'pazarlama', 'not', 'ozeltanimlar', 'fiyatdegistirme', 'bilgiler', 'crm'];
    contents.forEach(t => {
        const el = document.getElementById('teklif-tab-content-' + t);
        if (el) {
            el.style.removeProperty('display');
            el.style.display = 'none';
        }
        const head = document.getElementById('teklif-tab-header-' + t);
        if (head) {
            head.style.backgroundColor = '#e9ecef';
            head.style.borderBottom = '1px solid #cfd6df';
            head.style.fontWeight = 'normal';
            head.style.color = '#666';
        }
    });

    const activeContent = document.getElementById('teklif-tab-content-' + tabName);
    if (activeContent) {
        activeContent.style.setProperty('display', 'flex', 'important');
    }
    const activeHead = document.getElementById('teklif-tab-header-' + tabName);
    if (activeHead) {
        activeHead.style.backgroundColor = '#fff';
        activeHead.style.borderBottom = '1px solid #fff';
        activeHead.style.fontWeight = '700';
        activeHead.style.color = '#333';
    }
}

function addTeklifRow() {
    const tbody = document.getElementById('teklif-hareketler-body');
    const rowCount = tbody.children.length + 1;
    const row = document.createElement('tr');
    row.onclick = function () { selectTeklifRow(this); };
    row.style.color = '#000';
    row.style.cursor = 'pointer';
    row.innerHTML = `
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:center;color:#ccc;background:#f8f9fa;"><i class="bi bi-caret-right-fill" style="font-size:10px;color:#000;"></i></td>
                                 <td class="row-index" style="border:1px solid #cbd5e1;padding:2px;text-align:center;font-weight:bold;color:#1e3a8a;background:#dbeafe;">${rowCount}</td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;background:#dbeafe;"><input type="text" style="width:120px;border:none;outline:none;font-size:11px;background:transparent;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;background:#dbeafe;"><input type="text" style="width:180px;border:none;outline:none;font-size:11px;background:transparent;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:40px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;background:#dbeafe;"><input type="text" style="width:40px;border:none;outline:none;font-size:11px;background:transparent;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:70px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:70px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:center;background:#dbeafe;"><input type="text" style="width:40px;border:none;outline:none;font-size:11px;text-align:center;background:transparent;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:70px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:70px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:70px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:70px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:center;background:#dbeafe;"><input type="text" style="width:40px;border:none;outline:none;font-size:11px;text-align:center;background:transparent;font-weight:bold;color:#857a2c;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:center;background:#dbeafe;"><input type="text" style="width:30px;border:none;outline:none;font-size:11px;text-align:center;background:transparent;color:#857a2c;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:60px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;color:#857a2c;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:60px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;color:#857a2c;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:60px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;color:#857a2c;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:60px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;color:#857a2c;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:60px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;color:#857a2c;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:60px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;color:#857a2c;font-weight:bold;"></td>
                                 <td style="border:1px solid #cbd5e1;padding:2px;text-align:left;background:#dbeafe;"><input type="text" style="width:60px;border:none;outline:none;font-size:11px;text-align:left;background:transparent;color:#857a2c;font-weight:bold;"></td>
                             `;
    tbody.appendChild(row);
}

let selectedTeklifRowElem = null;
function selectTeklifRow(elem) {
    if (selectedTeklifRowElem) {
        selectedTeklifRowElem.style.background = 'transparent';
    }
    selectedTeklifRowElem = elem;
    selectedTeklifRowElem.style.background = '#e2e8f0';
}

function deleteSelectedTeklifRow() {
    if (selectedTeklifRowElem) {
        selectedTeklifRowElem.remove();
        selectedTeklifRowElem = null;
        reindexTeklifRows();
    }
}

function reindexTeklifRows() {
    const tbody = document.getElementById('teklif-hareketler-body');
    Array.from(tbody.children).forEach((row, index) => {
        const cell = row.querySelector('.row-index');
        if (cell) cell.innerText = index + 1;
    });
}

function switchMovementTab(tabName) {
    const contents = ['hareketler', 'odemeplani'];
    contents.forEach(t => {
        const el = document.getElementById('mov-tab-content-' + t);
        if (el) el.style.display = 'none';
        const head = document.getElementById('mov-tab-header-' + t);
        if (head) {
            head.style.backgroundColor = '#e9ecef';
            head.style.borderBottom = '1px solid #cfd6df';
            head.style.fontWeight = 'normal';
            head.style.color = '#666';
        }
    });

    const activeContent = document.getElementById('mov-tab-content-' + tabName);
    if (activeContent) {
        activeContent.style.display = 'flex';
    }
    const activeHead = document.getElementById('mov-tab-header-' + tabName);
    if (activeHead) {
        activeHead.style.backgroundColor = '#fff';
        activeHead.style.borderBottom = '1px solid #fff';
        activeHead.style.fontWeight = '700';
        activeHead.style.color = '#333';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('yurtIciVerilenTeklifView')) {
        openTeklifTab('cari');
    }
});



// ---------- Screen switching ----------
const homeView = document.getElementById('homeView');
const screenView = document.getElementById('screenView');
const businessView = document.getElementById('businessView');
const stokTanimlarListesiView = document.getElementById('stokTanimlarListesiView');
const yoneticiEkraniView = document.getElementById('yoneticiEkraniView');
const screenTitle = document.getElementById('screenTitle');
const screenPath = document.getElementById('screenPath');
const btnBack = document.getElementById('btnBack');
const btnCloseStokList = document.getElementById('btnCloseStokList');

// Helper to normalize strings for comparison (collapses multiple spaces/newlines)
function normalizeTitle(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
}

// Helper to show/hide views with responsive display types
function setViewVisibility(elementId, show) {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (show) {
        // Apply 'block' on mobile for simpler stacking, 'flex' on desktop
        el.style.display = (window.innerWidth < 900) ? 'block' : 'flex';
    } else {
        el.style.display = 'none';
    }
}

function hideAllSpecificViews() {
    const views = [
        'satisFaturasiView',
        'satisEkraniView',
        'yurtIciVerilenTeklifView',
        'stokTanimlarListesiView',
        'stokTanimlarView',
        'yoneticiEkraniView',
        'businessView',
        'adminPaneliView',
        'siparisTeslimRaporuSatisView',
        'masrafFaturasiView',
        'masrafFaturasiRaporuView',
        'hizmetRaporuHareketliView'
    ];
    views.forEach(v => setViewVisibility(v, false));
}

async function showHome() {
    // Restore sidebar
    const apps = document.querySelectorAll('.app-window');

    // Hide all specific views
    hideAllSpecificViews();

    screenTitle.textContent = 'Wolvox ERP';
    screenPath.textContent = 'Wolvox ERP';
    updateTabs(''); // Clear tabs
    updateShortcutButton('');

    // Restore layout
    const mainContainer = document.querySelector('.main');
    const leftPanel = document.getElementById('leftPanel');
    const workhead = document.getElementById('workhead');
    const workspace = document.querySelector('.workspace');

    if (mainContainer) mainContainer.style.gridTemplateColumns = 'var(--leftW) 1fr';
    if (leftPanel) leftPanel.style.display = 'flex';
    if (workhead) workhead.style.display = 'flex';
    const topMenuBar = document.querySelector('.menubar');
    if (topMenuBar) topMenuBar.style.display = 'flex';
    if (workspace) {
        workspace.style.padding = '10px 14px 28px';
        workspace.style.overflow = 'auto';
        workspace.style.background = '';
    }

    // Hide header return button
    const returnBtn = document.getElementById('returnToWolvoxBtn');
    if (returnBtn) returnBtn.style.display = 'none';

    homeView.style.display = '';
    screenView.style.display = 'none';
    businessView.style.display = 'none';
    stokTanimlarListesiView.style.display = 'none';
    yoneticiEkraniView.style.display = 'none';


    // Toggle left panel contents
    if (document.getElementById('mainMenuContainer')) document.getElementById('mainMenuContainer').style.display = '';
    if (document.getElementById('leftFilterPanel')) document.getElementById('leftFilterPanel').style.display = 'none';

    setActiveById('root');
    // expand root on home
    expandNode('root', true);
}

function openStokTanimlarModal() {
    const modal = document.getElementById('stokTanimlarView');
    const overlay = document.getElementById('stokModalOverlay');
    if (modal && overlay) {
        modal.style.display = 'flex';
        overlay.style.display = 'block';
    }
}

function closeStokTanimlarModal() {
    const modal = document.getElementById('stokTanimlarView');
    const overlay = document.getElementById('stokModalOverlay');
    if (modal && overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
}

function switchStokTab(el, tabId) {
    // Remove active from all tabs
    const modal = document.getElementById('stokTanimlarView');
    const tabs = modal.querySelectorAll('.st-tab');
    tabs.forEach(t => t.classList.remove('active'));

    // Add active to clicked tab
    el.classList.add('active');

    // Hide all tab panes and remove active class
    const panes = modal.querySelectorAll('.st-tab-pane');
    panes.forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });

    // Show target tab pane and add active class
    const target = document.getElementById('st-tab-' + tabId);
    if (target) {
        target.classList.add('active');
        // Some tabs use flex for their layout
        const flexTabs = ['ozel1', 'ozel2', 'ozel-tanim', 'alternatifler', 'alt-urunler', 'depo', 'tedarikciler', 'stok-durumu'];
        target.style.display = flexTabs.includes(tabId) ? 'flex' : 'block';
    }

    // Prices Action Bar Visibility
    const pricesBar = document.getElementById('st-prices-action-bar');
    if (pricesBar) {
        pricesBar.style.display = (tabId === 'fiyatlar') ? 'flex' : 'none';
    }

    // Dynamic Toolbar Buttons Visibility
    const hrkBtn = document.getElementById('st-btn-hrk-rp');
    const dnmBtn = document.getElementById('st-btn-dnm-gc');
    const hideOn = ['genel', 'birim'];
    if (hrkBtn && dnmBtn) {
        const display = hideOn.includes(tabId) ? 'none' : 'flex';
        hrkBtn.style.display = display;
        dnmBtn.style.display = display;
    }
}
function openScreen(title) {
    const normalizedTitle = normalizeTitle(title);

    // RESTORAN REDIRECT: Ensure standalone page navigation
    const lowerTitle = normalizedTitle.toLowerCase();
    if (lowerTitle === 'restoran' || lowerTitle === 'wolvox restoran') {
        window.location.href = 'restoran.html';
        return;
    }

    // Only hide homeView if we are switching to a real full-screen view
    if (normalizedTitle !== 'Stok Tanımları') {
        homeView.style.display = 'none';
        const workspace = document.querySelector('.workspace');
        if (workspace) workspace.style.background = '';
    }

    const mainMenu = document.getElementById('mainMenuContainer');
    const filterPanel = document.getElementById('leftFilterPanel');
    const mainContainer = document.querySelector('.main');
    const leftPanel = document.getElementById('leftPanel');
    const workhead = document.getElementById('workhead');

    // Default layout restoration (safe default)
    if (mainContainer) mainContainer.style.gridTemplateColumns = 'var(--leftW) 1fr';
    if (leftPanel) leftPanel.style.display = 'flex';
    if (workhead) workhead.style.display = 'flex';

    // Default: hide the header return button
    const returnBtn = document.getElementById('returnToWolvoxBtn');
    if (returnBtn) returnBtn.style.display = 'none';

    // Hide all specific views before showing the new one
    hideAllSpecificViews();

    if (normalizedTitle === 'İşletme Bilgi Kaydı') {
        screenView.style.display = 'none';
        setViewVisibility('businessView', true);
        if (mainMenu) mainMenu.style.display = '';
        if (filterPanel) filterPanel.style.display = 'none';
        // Restore Admin Panel hidden elements
        const topMenuBar = document.querySelector('.menubar');
        if (topMenuBar) topMenuBar.style.display = '';
        if (leftPanel) leftPanel.style.display = 'flex';
        if (workhead) workhead.style.display = 'flex';
    } else if (normalizedTitle === 'Stok Tanımlar Listesi') {
        screenView.style.display = 'none';
        setViewVisibility('stokTanimlarListesiView', true);
        // Show filter panel, hide menu
        if (mainMenu) mainMenu.style.display = 'none';
        if (filterPanel) filterPanel.style.display = 'flex';

        // Ensure Filtre 1 is active by default
        switchFilterTab('f1');
        filterStokTable(); // Initial populate
    } else if (normalizedTitle === 'Yönetici Ekranı') {
        screenView.style.display = 'none';
        setViewVisibility('yoneticiEkraniView', true);
        screenTitle.textContent = normalizedTitle;
        screenPath.textContent = 'Wolvox ERP  ›  ' + normalizedTitle;
        if (mainMenu) mainMenu.style.display = 'flex'; // Keep sidebar visible
        if (filterPanel) filterPanel.style.display = 'none';
        updateDashboard(); // Initial populate
    } else if (normalizedTitle === 'Satış Fatura' || normalizedTitle === 'Yurt İçi Satış Faturası') {
        screenView.style.display = 'none';
        setViewVisibility('satisFaturasiView', true);

        screenTitle.textContent = normalizedTitle;
        screenPath.textContent = 'Wolvox ERP  ›  ' + normalizedTitle;

        // FULL SCREEN MODE: Conditional for mobile/desktop
        if (window.innerWidth < 900) {
            // Mobile: Show header and tabs for context (1 and 2 photos request)
            if (leftPanel) leftPanel.style.display = 'flex';
            if (workhead) workhead.style.display = 'flex';
            if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';
        } else {
            // Desktop: Show workhead (tabs), hide leftPanel
            if (leftPanel) leftPanel.style.display = 'none';
            if (workhead) workhead.style.display = 'flex';
            if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';
        }

        const workspace = document.querySelector('.workspace');
        if (workspace) {
            workspace.style.padding = '0';
            workspace.style.overflow = 'hidden';
        }

        // Force correct scroll on mobile for fixed-position invoice view
        const satisView = document.getElementById('satisFaturasiView');
        if (satisView && window.innerWidth < 900) {
            satisView.style.height = '100%';
            satisView.style.display = 'flex';
            satisView.style.flexDirection = 'column';
        }

    } else if (normalizedTitle === 'Yurt İçi Verilen Teklif') {
        if (screenView) screenView.style.display = 'none';
        setViewVisibility('yurtIciVerilenTeklifView', true);

        screenTitle.textContent = normalizedTitle;
        screenPath.textContent = 'Wolvox ERP  ›  ' + normalizedTitle;

        if (window.innerWidth < 900) {
            if (leftPanel) leftPanel.style.display = 'flex';
            if (workhead) workhead.style.display = 'flex';
            if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';
        } else {
            if (leftPanel) leftPanel.style.display = 'none';
            if (workhead) workhead.style.display = 'flex';
            if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';
        }

        const workspace = document.querySelector('.workspace');
        if (workspace) {
            workspace.style.padding = '0';
            workspace.style.overflow = 'hidden';
        }

        const teklifView = document.getElementById('yurtIciVerilenTeklifView');
        if (teklifView && window.innerWidth < 900) {
            teklifView.style.height = '100%';
            teklifView.style.display = 'flex';
            teklifView.style.flexDirection = 'column';
        }

        // Ensure default tab is opened
        if (typeof openTeklifTab === 'function') {
            openTeklifTab('cari');
        }

    } else if (normalizedTitle === 'Sipariş Teslim Raporu (Satış Yönetimi)' || normalizedTitle === 'Sipariş Teslim Raporu') {
        if (screenView) screenView.style.display = 'none';
        setViewVisibility('siparisTeslimRaporuSatisView', true);

        screenTitle.textContent = 'Sipariş Teslim Raporu (Satış Yönetimi)';
        screenPath.textContent = 'Wolvox ERP  ›  Sipariş Teslim Raporu (Satış Yönetimi)';

        if (window.innerWidth < 900) {
            if (leftPanel) leftPanel.style.display = 'flex';
            if (workhead) workhead.style.display = 'flex';
            if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';
        } else {
            if (leftPanel) leftPanel.style.display = 'none';
            if (workhead) workhead.style.display = 'flex';
            if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';
        }

        if (workspace) {
            workspace.style.padding = '0';
            workspace.style.overflow = 'hidden';
            workspace.style.background = '#fff';
        }

    } else if (normalizedTitle === 'Masraf Faturası Raporu') {
        if (screenView) screenView.style.display = 'none';
        setViewVisibility('masrafFaturasiRaporuView', true);

        screenTitle.textContent = normalizedTitle;
        screenPath.textContent = 'Wolvox ERP  ›  ' + normalizedTitle;

        if (window.innerWidth < 900) {
            if (leftPanel) leftPanel.style.display = 'flex';
            if (workhead) workhead.style.display = 'flex';
            if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';
        } else {
            if (leftPanel) leftPanel.style.display = 'none';
            if (workhead) workhead.style.display = 'flex';
            if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';
        }

        const workspace = document.querySelector('.workspace');
        if (workspace) {
            workspace.style.padding = '0';
            workspace.style.overflow = 'hidden';
            workspace.style.background = '#f0f2f5';
        }

    } else if (normalizedTitle === 'Hizmet Raporu(hareketli)' || normalizedTitle === 'Hizmet Haraket Raporu') {
        if (screenView) screenView.style.display = 'none';
        setViewVisibility('hizmetRaporuHareketliView', true);

        screenTitle.textContent = 'Hizmet Raporu (Hareketli)';
        screenPath.textContent = 'Wolvox ERP  ›  Hizmet Raporu (Hareketli)';

        if (window.innerWidth < 900) {
            if (leftPanel) leftPanel.style.display = 'flex';
            if (workhead) workhead.style.display = 'flex';
            if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';
        } else {
            if (leftPanel) leftPanel.style.display = 'none';
            if (workhead) workhead.style.display = 'flex';
            if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';
        }

        const workspace = document.querySelector('.workspace');
        if (workspace) {
            workspace.style.padding = '0';
            workspace.style.overflow = 'hidden';
            workspace.style.background = '#f0f2f5';
        }

    } else if (normalizedTitle === 'Stok Tanımları') {
        openStokTanimlarModal();
        // We DON'T hide the main view or update screenTitle/Path necessarily 
        // updateShortcutButton(normalizedTitle);
        // updateTabs(normalizedTitle);
        return; // Stop here so background stays same
    } else if (normalizedTitle === 'Satış Ekranı') {
        screenView.style.display = 'none';
        setViewVisibility('satisEkraniView', true);
        screenTitle.textContent = normalizedTitle;
        screenPath.textContent = 'Wolvox ERP  ›  ' + normalizedTitle;

        // Full screen layout for Sales Screen - Navbar visible
        if (leftPanel) leftPanel.style.display = 'none';
        if (workhead) workhead.style.display = 'flex';
        if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';

        const workspace = document.querySelector('.workspace');
        if (workspace) {
            workspace.style.padding = '0';
            workspace.style.overflow = 'hidden';
            workspace.style.background = '#d1d5db';
        }

        // Show header return button for Sales Screen
        if (returnBtn) returnBtn.style.display = 'block';
    } else {
        screenView.style.display = '';
        screenTitle.textContent = normalizedTitle;
        screenPath.textContent = 'Wolvox ERP  ›  ' + normalizedTitle;
        if (mainMenu) mainMenu.style.display = '';
        if (filterPanel) filterPanel.style.display = 'none';
    }
    updateShortcutButton(normalizedTitle);
    updateTabs(normalizedTitle);
}

function updateTabs(title) {
    const normalizedTitle = normalizeTitle(title);
    const tabsContainer = document.getElementById('tabs');
    let existingTab = Array.from(tabsContainer.querySelectorAll('.tab')).find(t => normalizeTitle(t.querySelector('span').textContent) === normalizedTitle);

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    if (!existingTab) {
        existingTab = document.createElement('div');
        existingTab.className = 'tab';
        existingTab.innerHTML = `<span>${normalizedTitle}</span><span class="x" title="Sekmeyi kapat">×</span>`;
        tabsContainer.appendChild(existingTab);
    }
    existingTab.classList.add('active');
    existingTab.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function openBusinessScreen() {
    openScreen('İşletme Bilgi Kaydı');
}

function switchFilterTab(tabId) {
    // Hide all panes
    document.querySelectorAll('.filter-pane').forEach(p => p.style.display = 'none');
    // Show target pane
    const targetPane = document.getElementById('filter-' + tabId);
    if (targetPane) targetPane.style.display = 'block';

    // Reset tab classes
    document.querySelectorAll('.sf-tab').forEach(t => t.classList.remove('active'));

    // Set active tab
    const activeTab = document.getElementById('tab-' + tabId);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

const stokData = [
    { id: 1, kod: 'STK-001', ad: 'Coca Cola 2.5L', syd: 'Cola 2.5L', barkod: '8690000000123', ana: 'ASTK-001', grup: 'İÇECEK', ara: 'SOĞUK', alt: 'KOLA', miktar: '150,00', birim: 'ADET', f1: '25,00 TL', f2: '22,50 TL', f3: '20,00 TL', f4: '18,00 TL' },
    { id: 2, kod: 'STK-002', ad: 'Ariel Matik 5KG', syd: 'Ariel 5KG', barkod: '8690000000456', ana: 'ASTK-002', grup: 'TEMİZLİK', ara: 'DETERJAN', alt: 'TOZ', miktar: '85,00', birim: 'ADET', f1: '145,00 TL', f2: '140,00 TL', f3: '138,00 TL', f4: '135,00 TL' },
    { id: 3, kod: 'STK-003', ad: 'Ülker Bisküvi', syd: 'Ulker Biscuit', barkod: '8690000000789', ana: 'ASTK-003', grup: 'GIDA', ara: 'ATIŞTIRMALIK', alt: 'BİSKÜVİ', miktar: '200,00', birim: 'ADET', f1: '15,00 TL', f2: '12,00 TL', f3: '10,00 TL', f4: '9,00 TL' },
    { id: 4, kod: 'STK-004', ad: 'Faber Castell Kurşun Kalem', syd: 'Faber Pencil', barkod: '8690000000999', ana: 'ASTK-004', grup: 'KIRTASİYE', ara: 'KALEM', alt: 'KURŞUN', miktar: '500,00', birim: 'ADET', f1: '12,00 TL', f2: '10,00 TL', f3: '9,00 TL', f4: '8,00 TL' },
    { id: 5, kod: 'STK-005', ad: 'Sütaş Süt 1L', syd: 'Sutas Milk 1L', barkod: '8690000000111', ana: 'ASTK-001', grup: 'GIDA', ara: 'SÜT ÜRÜNLERİ', alt: 'SÜT', miktar: '100,00', birim: 'ADET', f1: '35,00 TL', f2: '32,00 TL', f3: '30,00 TL', f4: '28,00 TL' }
];

const stokHareketData = [
    { kod: 'STK-001', ad: 'Coca Cola 2.5L', barkod: '8690000000123', syd: 'Cola 2.5L', miktar: '2,00', brm: 'ADET', tmik: '2,00', tbrm: 'ADET', kpb: '25,00', kdvHrc: '25,00', ind: '25,00', ara: '50,00', indAra: '50,00', top: '50,00', kdli: '60,00', sim: '₺', akur: '1,00', skur: '1,00', tip: 'Satış' },
    { kod: 'STK-003', ad: 'Ülker Bisküvi', barkod: '8690000000789', syd: 'Ulker Biscuit', miktar: '5,00', brm: 'ADET', tmik: '5,00', tbrm: 'ADET', kpb: '15,00', kdvHrc: '15,00', ind: '15,00', ara: '75,00', indAra: '75,00', top: '75,00', kdli: '82,50', sim: '₺', akur: '1,00', skur: '1,00', tip: 'Satış' },
    { kod: 'STK-002', ad: 'Ariel Matik 5KG', barkod: '8690000000456', syd: 'Ariel 5KG', miktar: '1,00', brm: 'ADET', tmik: '1,00', tbrm: 'ADET', kpb: '145,00', kdvHrc: '145,00', ind: '145,00', ara: '145,00', indAra: '145,00', top: '145,00', kdli: '159,50', sim: '₺', akur: '1,00', skur: '1,00', tip: 'Alış' }
];

function filterStokTable() {
    const adF = (document.getElementById('sf-ad')?.value || '').toLowerCase();
    const kodF = (document.getElementById('sf-kod')?.value || '').toLowerCase();
    const barkodF = (document.getElementById('sf-barkod')?.value || '').toLowerCase();
    const grupElement = document.getElementById('sf-grup');
    const grupF = (grupElement?.value || '').toLowerCase();

    // Filter main stock list
    const filteredStok = stokData.filter(item => {
        const matchAd = item.ad.toLowerCase().includes(adF);
        const matchKod = item.kod.toLowerCase().includes(kodF);
        const matchBarkod = item.barkod.toLowerCase().includes(barkodF);
        const matchGrup = item.grup.toLowerCase().includes(grupF);
        return matchAd && matchKod && matchBarkod && matchGrup;
    });

    // Filter movements list
    const filteredHareket = stokHareketData.filter(item => {
        const matchAd = item.ad.toLowerCase().includes(adF);
        const matchKod = item.kod.toLowerCase().includes(kodF);
        const matchBarkod = item.barkod.toLowerCase().includes(barkodF);
        return matchAd && matchKod && matchBarkod;
    });

    // Update main table
    const tbody = document.querySelector('#stokTanimlarListesiView table tbody');
    if (tbody) {
        if (filteredStok.length === 0) {
            tbody.innerHTML = `<tr><td colspan="15" style="padding: 20px; text-align: center; color: var(--muted);">Sonuç bulunamadı.</td></tr>`;
        } else {
            tbody.innerHTML = filteredStok.map(item => `
                        <tr>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.id}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.kod}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.ad}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.syd}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.barkod}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.ana}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.grup}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.ara}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.alt}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.miktar}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.birim}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.f1}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.f2}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.f3}</td>
                            <td style="padding: 6px; border: 1px solid var(--line2);">${item.f4}</td>
                        </tr>
                    `).join('');
        }
    }

    const countTop = document.getElementById('stok-count-top');
    const countBottom = document.getElementById('stok-count-bottom');
    if (countTop) countTop.textContent = 'Listelenen Kayıt Sayısı: ' + filteredStok.length;
    if (countBottom) countBottom.textContent = 'Listelenen Kayıt Sayısı: ' + filteredStok.length;

    // Update movements table
    const hareketBody = document.getElementById('faturaHareketleriBody');
    if (hareketBody) {
        if (filteredHareket.length === 0) {
            hareketBody.innerHTML = `<tr><td colspan="20" style="padding: 10px; text-align: center; color: #999;">Hareket bulunamadı.</td></tr>`;
        } else {
            hareketBody.innerHTML = filteredHareket.map(h => `
                        <tr>
                            <td style="padding: 4px; border: 1px solid var(--line2);"><i class="bi bi-caret-right-fill" style="color:var(--blue)"></i></td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.kod}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.ad}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.barkod}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.syd}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.miktar}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.brm}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.tmik}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.tbrm}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.kpb}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.kdvHrc}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.ind}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.ara}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.indAra}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.top}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.kdli}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.sim}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.akur}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.skur}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${h.tip}</td>
                        </tr>
                    `).join('');
        }
    }

    // Update totals
    const toplamBody = document.getElementById('altToplamlarBody');
    if (toplamBody) {
        if (filteredHareket.length === 0) {
            toplamBody.innerHTML = `<tr><td colspan="8" style="padding: 10px; text-align: center; color: #999;">Toplam bilgisi yok.</td></tr>`;
        } else {
            // Calculate simple mock totals
            const totalAra = filteredHareket.reduce((acc, h) => acc + parseFloat(h.ara.replace(',', '.')), 0).toFixed(2).replace('.', ',');
            const totalKdv = (filteredHareket.reduce((acc, h) => acc + (parseFloat(h.kdli.replace(',', '.')) - parseFloat(h.ara.replace(',', '.'))), 0)).toFixed(2).replace('.', ',');
            const totalGenel = filteredHareket.reduce((acc, h) => acc + parseFloat(h.kdli.replace(',', '.')), 0).toFixed(2).replace('.', ',');
            const totalMiktar = filteredHareket.reduce((acc, h) => acc + parseFloat(h.miktar.replace(',', '.')), 0).toFixed(2).replace('.', ',');

            toplamBody.innerHTML = `
                        <tr style="background: #fffbe6; font-weight: bold;">
                            <td style="padding: 4px; border: 1px solid var(--line2);"><i class="bi bi-caret-right-fill" style="color:var(--green)"></i></td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">₺</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${totalMiktar}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${totalAra}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${totalGenel}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${totalMiktar}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${totalAra}</td>
                            <td style="padding: 4px; border: 1px solid var(--line2);">${totalGenel}</td>
                        </tr>
                    `;
        }
    }
}

function clearStokFilter() {
    const container = document.getElementById('stokFilterContent');
    if (!container) return;

    // Clear inputs (text, number, date)
    container.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]').forEach(input => input.value = '');

    // Reset selects
    container.querySelectorAll('select').forEach(select => {
        if (select.id === 'sf3-yerli' || select.id === 'sf3-iade') select.value = 'Tümü';
        else select.selectedIndex = 0;
    });

    // Reset radio buttons to default (Evet / Tümü)
    const radioEvet = container.querySelector('input[name="stokAktif"][value="1"]');
    if (radioEvet) radioEvet.checked = true;
    const radioTipTumu = container.querySelector('input[name="stokTip"][value="all"]');
    if (radioTipTumu) radioTipTumu.checked = true;

    // Reset checkboxes
    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.id === 'sf-kalan-show') cb.checked = true;
        else cb.checked = false;
    });

    const hareketBody = document.getElementById('faturaHareketleriBody');
    const toplamBody = document.getElementById('altToplamlarBody');
    if (hareketBody) hareketBody.innerHTML = `<tr><td colspan="20" style="padding: 10px; text-align: center; color: #999;">Hareket bulunamadı.</td></tr>`;
    if (toplamBody) toplamBody.innerHTML = `<tr><td colspan="8" style="padding: 10px; text-align: center; color: #999;">Toplam bilgisi yok.</td></tr>`;

    filterStokTable();
}

function filterBusinessTable() {
    const inputs = [
        document.getElementById('f-kod').value.toUpperCase(),
        document.getElementById('f-ad').value.toUpperCase(),
        document.getElementById('f-yetkili').value.toUpperCase(),
        document.getElementById('f-ytel').value.toUpperCase(),
        document.getElementById('f-itel').value.toUpperCase(),
        document.getElementById('f-mail').value.toUpperCase()
    ];
    const tbody = document.getElementById('businessTableBody');
    const trs = tbody.getElementsByTagName('tr');

    for (let i = 0; i < trs.length; i++) {
        let show = true;
        const tds = trs[i].getElementsByTagName('td');
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j] && tds[j]) {
                const txtValue = tds[j].textContent || tds[j].innerText;
                if (txtValue.toUpperCase().indexOf(inputs[j]) === -1) {
                    show = false;
                    break;
                }
            }
        }
        trs[i].style.display = show ? "" : "none";
    }
}
btnBack.addEventListener('click', showHome);
btnCloseStokList.addEventListener('click', showHome);
if (document.getElementById('btnBackToMenu')) {
    document.getElementById('btnBackToMenu').addEventListener('click', showHome);
}

// ---------- Tabs (demo) ----------
const tabsList = document.getElementById('tabs');
tabsList.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (!tab) return;

    const title = normalizeTitle(tab.querySelector('span').textContent);

    if (e.target.classList.contains('x')) {
        const wasActive = tab.classList.contains('active');
        tab.remove();
        if (wasActive) {
            const remainingTabs = tabsList.querySelectorAll('.tab');
            if (remainingTabs.length > 0) {
                const lastTab = remainingTabs[remainingTabs.length - 1];
                const lastTitle = normalizeTitle(lastTab.querySelector('span').textContent);
                openScreen(lastTitle);
            } else {
                showHome();
            }
        }
        return;
    }

    openScreen(title);
    expandSidebarByTitle(title);
});

function expandSidebarByTitle(title) {
    const sidebar = document.querySelector('.pro-menu-wrap');
    if (!sidebar) return;

    // Find all links to search for the title
    const allLinks = sidebar.querySelectorAll('a');
    let matchedLink = null;

    allLinks.forEach(a => {
        const span = a.querySelector('.menu-title');
        if ((span && span.textContent.trim() === title) || (a.textContent.trim() === title)) {
            matchedLink = a;
        }
    });

    if (matchedLink) {
        // Open all parent sub-menus
        let parent = matchedLink.parentElement;
        while (parent && !parent.classList.contains('pro-menu-wrap')) {
            if (parent.classList.contains('sub-menu')) {
                parent.classList.add('open');
            }
            parent = parent.parentElement;
        }
        // Scroll into view
        matchedLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}



// ---------- Sidebar Accordion (MULTI-OPEN) ----------
(function () {
    const root = document.querySelector(".pro-menu-wrap");
    if (!root) return;

    // start closed (keep if you want; comment out to remember last state)
    // root.querySelectorAll(".menu-item.sub-menu").forEach(li=> li.classList.remove("open"));

    root.addEventListener("click", function (e) {
        const a = e.target.closest(".menu-item.sub-menu > a");
        if (!a || !root.contains(a)) return;
        e.preventDefault();
        e.stopPropagation();

        const li = a.parentElement;
        // MULTI-OPEN: do NOT close siblings
        li.classList.toggle("open");
    }, true);
})();
// -----------------------------------------------


// ---------- Init ----------

// ---------- Mobile Sidebar Toggle ----------
const leftPanel = document.getElementById('leftPanel');
const overlay = document.getElementById('ovl');
const btnClose = document.getElementById('leftClose');

function toggleMenu() {
    if (!leftPanel || !overlay) return;
    leftPanel.classList.toggle('open');
    overlay.classList.toggle('show');
}

function closeMenu() {
    if (leftPanel) leftPanel.classList.remove('open');
    if (overlay) overlay.classList.remove('show');

    // Also close the Sipariş Teslim Raporu filter panel
    const strPanel = document.getElementById('str-filter-panel');
    if (strPanel) strPanel.classList.remove('open');
}

function toggleStrFilter() {
    const panel = document.getElementById('str-filter-panel');
    const ovl = document.getElementById('ovl');
    if (panel && ovl) {
        panel.classList.toggle('open');
        ovl.classList.toggle('show');
    }
}



if (btnClose) btnClose.addEventListener('click', closeMenu);
if (overlay) overlay.addEventListener('click', closeMenu);

// Hamburger button in workhead
document.addEventListener('click', (e) => {
    const hamb = e.target.closest('#hamb2, #hamb, .hamb');
    if (hamb) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    }
});

// Global click listener to close menu when clicking outside left panel (mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 980) {
        const lp = document.getElementById('leftPanel');
        const strPanel = document.getElementById('str-filter-panel');
        
        const isLpOpen = lp && lp.classList.contains('open');
        const isStrOpen = strPanel && strPanel.classList.contains('open');

        if (isLpOpen || isStrOpen) {
            const isToggleBtn = e.target.closest('#hamb2, #hamb, .hamb, #top-menu-toggle, .str-mobile-hamb, .str-mobile-filter');
            const isInsideLp = lp && lp.contains(e.target);
            const isInsideStr = strPanel && strPanel.contains(e.target);

            if (!isToggleBtn && !isInsideLp && !isInsideStr) {
                closeMenu();
            }
        }
    }
});

// Auto-close on leaf click (mobile)
const proMenu = document.querySelector('.pro-menu-wrap');
if (proMenu) {
    proMenu.addEventListener('click', (e) => {
        if (window.innerWidth <= 980) {
            // If it's a leaf node link (not a submenu toggle)
            const link = e.target.closest('a');
            if (link && !link.parentElement.classList.contains('sub-menu')) {
                closeMenu();
            }
        }
    });
}

// ---------- Landing Screen Logic ----------
function enterApp() {
    const landing = document.getElementById('landing-screen');
    if (landing) {
        landing.classList.add('hidden');
    }
}

// ---------- Sidebar Link Actions ----------
const sidebarMenu = document.querySelector('.pro-menu-wrap');
if (sidebarMenu) {
    sidebarMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            // If it's a submenu toggle, let the existing accordion logic handle it.
            // We only want to handle leaf nodes (actual pages).
            // Existing logic uses e.stopImmediatePropagation? No, let's check class.
            // The parent li has 'sub-menu' if it's a folder.
            const parentLi = link.parentElement;

            if (!parentLi.classList.contains('sub-menu')) {
                e.preventDefault(); // Prevent hash jump
                const titleSpan = link.querySelector('.menu-title');
                const text = normalizeTitle(titleSpan ? titleSpan.textContent : link.textContent);
                console.log('Opening screen:', text);
                openScreen(text);

                // On mobile, close menu
                if (window.innerWidth <= 980) {
                    closeMenu();
                }
            }
        }
    });
}

// ---------- Modal Logic ----------
const dashboardMockData = {
    'year': {
        'stat-satis-tutari': 368160.00,
        'stat-alis-tutari': 125000.00,
        'stat-masraf-toplam': 45000.00,
        'stat-satis-iade': 12000.00,
        'stat-alis-iade': 0.00,
        'stat-tahsilat-toplam': 210000.00,
        'stat-tediye-toplam': 80000.00,
        'stok-satis-tutari': 306800.00
    },
    'month': {
        'stat-satis-tutari': 32450.00,
        'stat-alis-tutari': 11200.00,
        'stat-masraf-toplam': 3800.00,
        'stat-satis-iade': 1100.00,
        'stat-alis-iade': 0.00,
        'stat-tahsilat-toplam': 18500.00,
        'stat-tediye-toplam': 7200.00,
        'stok-satis-tutari': 28500.00
    },
    'week': {
        'stat-satis-tutari': 7820.00,
        'stat-alis-tutari': 2450.00,
        'stat-masraf-toplam': 850.00,
        'stat-satis-iade': 240.00,
        'stat-alis-iade': 0.00,
        'stat-tahsilat-toplam': 4200.00,
        'stat-tediye-toplam': 1500.00,
        'stok-satis-tutari': 6100.00
    },
    'jan2025': {
        'stat-satis-tutari': 28900.00,
        'stat-alis-tutari': 9800.00,
        'stat-masraf-toplam': 3100.00,
        'stat-satis-iade': 950.00,
        'stat-alis-iade': 0.00,
        'stat-tahsilat-toplam': 16200.00,
        'stat-tediye-toplam': 6400.00,
        'stok-satis-tutari': 24300.00
    }
};

function updateDashboard() {
    const branch = document.getElementById('db-branch').value;
    const currency = document.getElementById('db-currency').value;
    const dateRange = document.getElementById('db-date').value;

    // 1. Update date display
    const startDateEl = document.getElementById('db-start-date');
    const endDateEl = document.getElementById('db-end-date');

    if (dateRange === 'year') {
        startDateEl.textContent = '01.01.2026 00:00';
        endDateEl.textContent = '31.12.2026 23:59';
    } else if (dateRange === 'month') {
        startDateEl.textContent = '01.02.2026 00:00';
        endDateEl.textContent = '28.02.2026 23:59';
    } else if (dateRange === 'week') {
        startDateEl.textContent = '16.02.2026 00:00';
        endDateEl.textContent = '22.02.2026 23:59';
    } else if (dateRange === 'jan2025') {
        startDateEl.textContent = '01.01.2025 00:00';
        endDateEl.textContent = '31.01.2025 23:59';
    }

    // 2. Mock Multipliers
    let multiplier = 1.0;
    if (branch === 'A') multiplier = 0.4;
    if (branch === 'B') multiplier = 0.35;
    if (branch === 'C') multiplier = 0.25;

    let currencyRate = 1.0;
    let symbol = 'TL';
    if (currency === 'USD') { currencyRate = 0.033; symbol = '$'; }
    if (currency === 'EUR') { currencyRate = 0.031; symbol = '€'; }

    // 3. Update Stat Cards (Selection based on dateRange)
    const baseValues = dashboardMockData[dateRange] || dashboardMockData['year'];

    document.querySelectorAll('.stat-card').forEach(card => {
        const id = card.getAttribute('data-chart-id');
        const baseValue = baseValues[id] || 0;
        const finalValue = (baseValue * multiplier * currencyRate).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const valueEl = card.querySelector('.stat-value');
        if (valueEl) {
            valueEl.textContent = `${finalValue} ${symbol}`;
        }
    });

    // 4. Update Analysis Cards (Charts & Lists)
    document.querySelectorAll('.analysis-card').forEach(card => {
        // Update Bar Heights (Mock Effect)
        const bars = card.querySelectorAll('.analysis-card-body > div:first-child > div');
        bars.forEach(bar => {
            const randomHeight = Math.floor(Math.random() * 70) + 20; // 20% to 90%
            bar.style.height = (randomHeight * multiplier) + '%';
        });

        // Update List Values
        const listItems = card.querySelectorAll('.analysis-card-body > div:last-child > div');
        listItems.forEach(item => {
            const valSpan = item.querySelector('span:last-child');
            if (valSpan) {
                const originalText = valSpan.textContent;
                const numericPart = parseFloat(originalText.replace(/[^0-9,]/g, '').replace(',', '.'));
                if (!isNaN(numericPart)) {
                    const newValue = (numericPart * multiplier * currencyRate);
                    const unit = originalText.includes('Adet') ? ' Adet' : ` ${symbol}`;
                    valSpan.textContent = newValue.toLocaleString('tr-TR', { minimumFractionDigits: originalText.includes('Adet') ? 0 : 2, maximumFractionDigits: 2 }) + unit;
                }
            }
        });
    });

    console.log(`Dashboard updated for Branch: ${branch}, Currency: ${currency}, Date: ${dateRange}`);
}

function openDashboardSettings() {
    openModal('modal-dashboard-settings');
}

function toggleAllDashboardFilters(cb) {
    const checkboxes = document.querySelectorAll('#analysis-checklist input[type="checkbox"]');
    checkboxes.forEach(chk => chk.checked = cb.checked);
}


function toggleAllFilters(state) {
    const checkboxes = document.querySelectorAll('#analysis-checklist input[type="checkbox"]');
    checkboxes.forEach(chk => chk.checked = state);
}

function deselectAllDashboardCards() {
    // Deselect all checkboxes in the settings modal
    toggleAllFilters(false);
    // Apply the deselection to hide all cards
    applyDashboardSettings();
}

function applyDashboardSettings() {
    const checkboxes = document.querySelectorAll('#analysis-checklist input[type="checkbox"]');
    checkboxes.forEach(chk => {
        const chartId = chk.getAttribute('data-chart');
        // Target both analysis-card and stat-card with matching data-chart-id
        const cards = document.querySelectorAll(`[data-chart-id="${chartId}"]`);
        cards.forEach(card => {
            card.style.display = chk.checked ? '' : 'none';
        });
    });
    closeModal('modal-dashboard-settings');
}

function openModal(id) {
    document.getElementById(id).classList.add('open');
    // Pre-fill input if needed (optional)
}
function closeModal(id) {
    document.getElementById(id).classList.remove('open');
}

// ---------- Shortcuts Logic ----------
const btnShortcut = document.getElementById('btnShortcut');
const btnBusinessShortcut = document.getElementById('btnBusinessShortcut');
const btnStokShortcut = document.getElementById('btnStokShortcut');
const btnStokTanimShortcut = document.getElementById('btnStokTanimShortcut');
const shortcutsSection = document.getElementById('shortcuts-section');
const shortcutsContainer = document.getElementById('shortcuts-container');

// Load shortcuts from local storage on load
const savedShortcuts = JSON.parse(localStorage.getItem('wolvox_shortcuts') || '[]');
if (savedShortcuts.length > 0) {
    savedShortcuts.forEach(title => createShortcutElement(normalizeTitle(title)));
    shortcutsSection.style.display = '';
}

if (btnShortcut) {
    btnShortcut.addEventListener('click', () => {
        const title = normalizeTitle(document.getElementById('screenTitle').textContent);
        addShortcut(title);
    });
}

if (btnBusinessShortcut) {
    btnBusinessShortcut.addEventListener('click', () => {
        addShortcut('İşletme Bilgi Kaydı');
    });
}

if (btnStokShortcut) {
    btnStokShortcut.addEventListener('click', () => {
        addShortcut('Stok Tanımlar Listesi');
    });
}

if (btnStokTanimShortcut) {
    // Update initial state
    const _stokTanimTitle = 'Stok Tanımları';
    const _stokTanimSaved = JSON.parse(localStorage.getItem('wolvox_shortcuts') || '[]');
    if (_stokTanimSaved.some(t => normalizeTitle(t) === normalizeTitle(_stokTanimTitle))) {
        btnStokTanimShortcut.style.opacity = '0.6';
        const sp = btnStokTanimShortcut.querySelector('span');
        if (sp) sp.textContent = 'Kısayolda Ekli';
    }
    btnStokTanimShortcut.addEventListener('click', () => {
        toggleShortcut('Stok Tanımları');
    });
}

function toggleShortcut(title) {
    const normalizedTitle = normalizeTitle(title);
    const current = JSON.parse(localStorage.getItem('wolvox_shortcuts') || '[]');
    const isAdded = current.some(t => normalizeTitle(t) === normalizedTitle);

    if (isAdded) {
        removeFromShortcuts(null, normalizedTitle);
    } else {
        addShortcut(normalizedTitle);
    }
}


function updateShortcutButton(title) {
    const normalizedTitle = normalizeTitle(title);
    const current = JSON.parse(localStorage.getItem('wolvox_shortcuts') || '[]');
    const isAdded = current.some(t => normalizeTitle(t) === normalizedTitle);

    let btn = btnShortcut;
    if (normalizedTitle === 'İşletme Bilgi Kaydı') btn = btnBusinessShortcut;
    else if (normalizedTitle === 'Stok Tanımlar Listesi') btn = btnStokShortcut;

    if (btn) {
        const span = btn.querySelector('span');
        if (span) {
            span.textContent = isAdded ? '⭐ Kısayolda Ekli' : '⭐ Kısayola Ekle';
        }
        btn.style.opacity = isAdded ? '0.6' : '1';
    }

    // Also update the Stok Tanımları modal toolbar button
    if (normalizedTitle === normalizeTitle('Stok Tanımları') && btnStokTanimShortcut) {
        const sp = btnStokTanimShortcut.querySelector('span');
        if (isAdded) {
            if (sp) sp.textContent = 'Kısayolda Ekli';
            btnStokTanimShortcut.style.opacity = '0.6';
        } else {
            if (sp) sp.textContent = 'Kısayol';
            btnStokTanimShortcut.style.opacity = '1';
        }
    }

    // Sync with sidebar menu icons if necessary (highlight/unhighlight)
}

function addShortcut(title) {
    const normalizedTitle = normalizeTitle(title);
    // Check for duplicates
    const current = JSON.parse(localStorage.getItem('wolvox_shortcuts') || '[]');
    if (current.some(t => normalizeTitle(t) === normalizedTitle)) {
        alert('Bu sayfa zaten kısayolarda ekli.');
        return;
    }

    // Save
    current.push(normalizedTitle);
    localStorage.setItem('wolvox_shortcuts', JSON.stringify(current));

    // UI
    createShortcutElement(normalizedTitle);
    shortcutsSection.style.display = '';

    // Visual feedback
    let btn = btnShortcut;
    if (normalizedTitle === 'İşletme Bilgi Kaydı') btn = btnBusinessShortcut;
    else if (normalizedTitle === 'Stok Tanımlar Listesi') btn = btnStokShortcut;

    // Also update the Stok Tanımları modal toolbar button
    if (normalizedTitle === normalizeTitle('Stok Tanımları') && btnStokTanimShortcut) {
        const sp = btnStokTanimShortcut.querySelector('span');
        if (sp) sp.textContent = 'Eklendi! ✔';
        btnStokTanimShortcut.style.opacity = '0.6';
        setTimeout(() => {
            updateShortcutButton(normalizedTitle);
        }, 1500);
    }

    if (btn) {
        const span = btn.querySelector('span');
        if (span) span.textContent = 'Eklendi! ✔';
        setTimeout(() => {
            updateShortcutButton(normalizedTitle);
        }, 1500);
    }
}

function createShortcutElement(title) {
    const normalizedTitle = normalizeTitle(title);
    const div = document.createElement('div');
    div.className = 'mini';

    // Icon container
    const pico = document.createElement('div');
    pico.className = 'pico';
    div.appendChild(pico);

    // Title
    const b = document.createElement('b');
    b.textContent = normalizedTitle;
    div.appendChild(b);

    div.onclick = () => openScreen(normalizedTitle);
    shortcutsContainer.appendChild(div);
}

function saveCompany() {
    const val = document.getElementById('input-company').value;
    if (val) {
        document.getElementById('disp-company').innerHTML = '<b>Şirket :</b> ' + val;
        closeModal('modal-company');
    }
}
function saveUser() {
    const val = document.getElementById('input-user').value;
    if (val) {
        document.getElementById('disp-user').innerHTML = '<b>Kullanıcı :</b> ' + val;
        closeModal('modal-user');
    }
}

// ---------- Shortcut Management Logic ----------
const contextMenu = document.getElementById('context-menu');
let triggerElement = null;

document.addEventListener('click', () => {
    if (contextMenu) contextMenu.style.display = 'none';
    triggerElement = null;
});

// Long-press support for Mobile
let pressTimer;
function startLongPress(e, title) {
    if (e.type === 'touchstart') {
        pressTimer = window.setTimeout(() => {
            const touch = e.touches[0];
            const mockEvent = {
                preventDefault: () => { },
                stopPropagation: () => { },
                clientX: touch.clientX,
                clientY: touch.clientY
            };
            showContextMenu(mockEvent, title);
        }, 600);
    }
}
function cancelLongPress() {
    clearTimeout(pressTimer);
}

function showContextMenu(e, title) {
    e.preventDefault();
    e.stopPropagation();
    const normalizedTitle = normalizeTitle(title);
    contextMenu.style.display = 'block';

    let x = e.clientX || 0;
    let y = e.clientY || 0;

    // Boundary check
    const menuWidth = 180;
    const menuHeight = 80; // Estimated height for 2 items

    if (x + menuWidth > window.innerWidth) {
        x = window.innerWidth - menuWidth - 10;
    }
    if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - menuHeight - 10;
    }

    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
    contextMenu.innerHTML = '';

    const current = JSON.parse(localStorage.getItem('wolvox_shortcuts') || '[]');
    const isAdded = current.some(t => normalizeTitle(t) === normalizedTitle);

    const item = document.createElement('div');
    item.className = 'context-item';

    if (!isAdded) {
        item.innerHTML = '<span>➕ Kısayollara Ekle</span>';
        item.onclick = () => {
            addShortcut(normalizedTitle);
            contextMenu.style.display = 'none';
        };
    } else {
        item.innerHTML = '<span>🗑️ Kısayollardan Kaldır</span>';
        item.onclick = () => {
            const iconEl = findShortcutElementByTitle(normalizedTitle);
            removeFromShortcuts(iconEl, normalizedTitle);
            contextMenu.style.display = 'none';
        };
    }
    contextMenu.appendChild(item);
}

function findShortcutElementByTitle(title) {
    const normalizedTitle = normalizeTitle(title);
    const container = document.getElementById('shortcuts-container');
    if (!container) return null;

    // Only find in shortcuts-container (mini icons)
    const icons = container.querySelectorAll('.mini');
    return Array.from(icons).find(icon => {
        const b = icon.querySelector('b');
        return b && normalizeTitle(b.textContent) === normalizedTitle;
    });
}

// Bind Context Menu to Sidebar Items
const sidebarWrap = document.querySelector('.pro-menu-wrap');
if (sidebarWrap) {
    sidebarWrap.addEventListener('contextmenu', (e) => {
        const link = e.target.closest('a');
        if (link) {
            const parentLi = link.parentElement;
            if (!parentLi.classList.contains('sub-menu')) {
                const titleSpan = link.querySelector('.menu-title');
                const text = normalizeTitle(titleSpan ? titleSpan.textContent : link.textContent);
                showContextMenu(e, text);
            }
        }
    });

    // Long press for sidebar
    sidebarWrap.addEventListener('touchstart', (e) => {
        const link = e.target.closest('a');
        if (link && !link.parentElement.classList.contains('sub-menu')) {
            const titleSpan = link.querySelector('.menu-title');
            const text = normalizeTitle(titleSpan ? titleSpan.textContent : link.textContent);
            startLongPress(e, text);
        }
    }, { passive: true });
    sidebarWrap.addEventListener('touchend', cancelLongPress);
    sidebarWrap.addEventListener('touchmove', cancelLongPress);
}

// Bind Context Menu to Toolbar Shortcut Buttons
[btnShortcut, btnBusinessShortcut, btnStokShortcut, btnStokTanimShortcut].forEach(btn => {
    if (btn) {
        btn.addEventListener('contextmenu', (e) => {
            let text = '';
            if (btn === btnStokTanimShortcut) text = 'Stok Tanımları';
            else if (btn === btnBusinessShortcut) text = 'İşletme Bilgi Kaydı';
            else if (btn === btnStokShortcut) text = 'Stok Tanımlar Listesi';
            else if (btn === btnShortcut) text = normalizeTitle(document.getElementById('screenTitle')?.textContent || '');

            if (text) showContextMenu(e, text);
        });
    }
});

// Bind Context Menu to Workspace Icons
const workspaceArea = document.querySelector('.workspace');
if (workspaceArea) {
    workspaceArea.addEventListener('contextmenu', (e) => {
        const icon = e.target.closest('.bigicon, .mini');
        if (icon) {
            const b = icon.querySelector('b');
            if (b) {
                const text = normalizeTitle(b.textContent);
                showContextMenu(e, text);
            }
        }
    });

    // Long press for workspace
    workspaceArea.addEventListener('touchstart', (e) => {
        const icon = e.target.closest('.bigicon, .mini');
        if (icon) {
            const b = icon.querySelector('b');
            if (b) {
                const text = normalizeTitle(b.textContent);
                startLongPress(e, text);
            }
        }
    }, { passive: true });
    workspaceArea.addEventListener('touchend', cancelLongPress);
    workspaceArea.addEventListener('touchmove', cancelLongPress);
}

// Also bind context menu directly to shortcuts-container (in case it is outside .workspace)
const shortcutsContainerEl = document.getElementById('shortcuts-container');
if (shortcutsContainerEl) {
    shortcutsContainerEl.addEventListener('contextmenu', (e) => {
        const icon = e.target.closest('.bigicon, .mini');
        if (icon) {
            const b = icon.querySelector('b');
            if (b) {
                const text = normalizeTitle(b.textContent);
                showContextMenu(e, text);
            }
        }
    });
}

function removeFromShortcuts(iconElement, text) {
    const normalizedTitle = normalizeTitle(text || (iconElement ? iconElement.querySelector('b')?.textContent : ''));
    if (!normalizedTitle) return;

    if (confirm('Kısayolu kaldırmak istiyor musunuz?')) {
        const current = JSON.parse(localStorage.getItem('wolvox_shortcuts') || '[]');
        const updated = current.filter(t => normalizeTitle(t) !== normalizedTitle);
        localStorage.setItem('wolvox_shortcuts', JSON.stringify(updated));

        // Safety: only remove if it's actually in shortcuts-container
        const scContainer = document.getElementById('shortcuts-container');
        const elementToRemove = iconElement || findShortcutElementByTitle(normalizedTitle);

        if (elementToRemove && scContainer && scContainer.contains(elementToRemove)) {
            elementToRemove.remove();
        }

        // Always update shortcut buttons (toolbar + list page button)
        updateShortcutButton(normalizedTitle);

        // Hide shortcuts section if empty
        if (updated.length === 0) {
            const scSection = document.getElementById('shortcuts-section');
            if (scSection) scSection.style.display = 'none';
        }
    }
}

// Also need to make sure existing static icons work with openScreen
// (Assuming they don't have onclicks yet, or we'll add delegation for clicking too)
if (workspace) {
    workspace.addEventListener('click', (e) => {
        const icon = e.target.closest('.bigicon, .mini');
        if (icon) {
            const b = icon.querySelector('b');
            if (b) {
                const text = normalizeTitle(b.textContent);
                openScreen(text);
                expandSidebarByTitle(text);
            }
        }
    });
}

// ---------- Top Menu Mobile Toggle ----------
const btnTopMenu = document.getElementById('top-menu-toggle');
const topMenuBar = document.querySelector('.menubar');

if (btnTopMenu && topMenuBar) {
    btnTopMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        topMenuBar.classList.toggle('show');
    });

    // Navbar click handling for both desktop and mobile
    topMenuBar.addEventListener('click', (e) => {
        // Handle sub-header clicks (İşlemler, Tanımlar, Raporlar)
        const subHeader = e.target.closest('.sub-header');
        if (subHeader) {
            e.stopPropagation();
            const subSection = subHeader.nextElementSibling;
            if (subSection && subSection.classList.contains('sub-section')) {
                subHeader.classList.toggle('expanded');
                subSection.classList.toggle('show');
            }
            return;
        }

        const link = e.target.closest('a');
        if (link) {
            // It's a click on a sub-menu item
            e.preventDefault();
            // The openScreen is already handled by inline onclick, 
            // but we ensure consistency and menu closing here.
            topMenuBar.classList.remove('show');
            if (window.innerWidth <= 980) closeMenu();
            // Close all dropdowns after clicking a link
            document.querySelectorAll('.menuitem.show').forEach(item => {
                item.classList.remove('show');
            });
            return;
        }

        const item = e.target.closest('.menuitem');
        if (item) {
            e.stopPropagation();

            // Check if this item has a dropdown
            const hasDropdown = item.querySelector('.menubar-dropdown-content');
            if (hasDropdown) {
                // Close all other dropdowns
                document.querySelectorAll('.menuitem.show').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('show');
                    }
                });

                // Toggle this dropdown
                item.classList.toggle('show');
            }
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!topMenuBar.contains(e.target) && !btnTopMenu.contains(e.target)) {
            topMenuBar.classList.remove('show');
            // Close all dropdowns
            document.querySelectorAll('.menuitem.show').forEach(item => {
                item.classList.remove('show');
            });
        }
    });
}


showHome();

// -------------------------------------------------------------
// SIDEBAR MENU SEARCH FILTER - ROBUST VERSION
// -------------------------------------------------------------

// -------------------------------------------------------------
// SIDEBAR MENU SEARCH FILTER - ROBUST VERSION (Class Based)
// -------------------------------------------------------------

// -------------------------------------------------------------
// SIDEBAR MENU SEARCH FILTER - GLOBAL & ROBUST
// -------------------------------------------------------------


// -------------------------------------------------------------
// SIDEBAR MENU SEARCH FILTER - GLOBAL & ROBUST
// -------------------------------------------------------------


// -------------------------------------------------------------
// SIDEBAR MENU SEARCH FILTER - ROBUST EVENT LISTENER VERSION
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM loaded, initializing search...");

    const inputEl = document.getElementById('menuSearchInput');
    if (inputEl) {
        // Remove old inline handlers validity
        inputEl.oninput = null;
        inputEl.onkeydown = null;

        // Bind INPUT event (Real-time and clearing)
        inputEl.addEventListener('input', function (e) {
            globalSearchMenu(this);
        });

        // Bind ENTER key (User preference)
        inputEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                globalSearchMenu(this);
            }
        });

        // Visual confirmation it's ready
        inputEl.style.border = '1px solid #3b82f6';
    } else {
        console.error("Search input not found!");
    }
});


// -------------------------------------------------------------
// FILTER TABS SWITCHING
// -------------------------------------------------------------
window.switchFilterTab = function (tabName) {
    // 1. Remove active class from all tabs
    document.querySelectorAll('.sf-tab').forEach(t => t.classList.remove('active'));

    // 2. Add active class to clicked tab
    const activeTab = document.getElementById('tab-' + tabName);
    if (activeTab) activeTab.classList.add('active');

    // 3. Hide all content panes
    document.querySelectorAll('.filter-pane').forEach(p => p.style.display = 'none');

    // 4. Show selected content pane
    const content = document.getElementById('filter-' + tabName);
    if (content) content.style.display = 'block';
};

window.globalSearchMenu = function (inputEl) {
    try {
        // Feedback
        inputEl.style.borderColor = '#3b82f6';

        function normalizeForSearch(text) {
            if (!text) return "";
            return text
                .replace(/İ/g, 'i').replace(/I/g, 'ı')
                .toLowerCase()
                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                .replace(/[^a-z0-9]/g, '');
        }

        const searchText = normalizeForSearch(inputEl.value || "");

        const container = document.getElementById('mainMenuContainer') || document.querySelector('.pro-menu-wrap');
        if (!container) return;

        const allItems = container.querySelectorAll('.menu-item');
        const allSubLists = container.querySelectorAll('.sub-menu-list');

        // --- RESET MODE ---
        if (!searchText) {
            allItems.forEach(item => {
                item.classList.remove('search-hidden');
                item.classList.remove('search-match');
                item.style.display = '';

                if (item.classList.contains('search-expanded')) {
                    item.classList.remove('open', 'search-expanded');
                }
            });
            // Clear forced display on lists
            allSubLists.forEach(list => {
                list.style.display = '';
            });

            inputEl.style.borderColor = '#ccc';
            const debugEl = document.getElementById('search-debug-info');
            if (debugEl) debugEl.textContent = "";
            return;
        }

        // --- SEARCH MODE ---

        // 1. First, hide EVERYTHING
        allItems.forEach(item => {
            item.classList.add('search-hidden');
            item.classList.remove('search-match');
            item.style.display = ''; // Ensure no inline display overrides class
        });

        let matchCount = 0;

        // 2. Check for matches
        allItems.forEach(item => {
            // Check clean visible text
            const titleEl = item.querySelector('.menu-title');
            const textToCheck = titleEl ? titleEl.innerText : item.innerText;

            if (normalizeForSearch(textToCheck).includes(searchText)) {
                matchCount++;

                // Reveal Self
                item.classList.remove('search-hidden');
                item.classList.add('search-match');

                // Reveal Parents (Bubble up)
                let parent = item.parentElement;
                while (parent && parent !== container) {

                    // Unhide parent LIs
                    if (parent.classList.contains('menu-item')) {
                        parent.classList.remove('search-hidden');
                        if (!parent.classList.contains('open')) {
                            parent.classList.add('open', 'search-expanded');
                        }
                    }

                    // Force show parent sub-menu-lists
                    if (parent.classList.contains('sub-menu-list')) {
                        parent.style.display = 'block';
                    }

                    parent = parent.parentElement;
                }
            }
        });

        // Color feedback
        inputEl.style.borderColor = matchCount > 0 ? '#22c55e' : '#ef4444';

        // Debug
        let debugEl = document.getElementById('search-debug-info');
        if (!debugEl) {
            debugEl = document.createElement('span');
            debugEl.id = 'search-debug-info';
            debugEl.style.fontSize = '10px';
            debugEl.style.marginLeft = '5px';
            inputEl.parentNode.appendChild(debugEl);
        }
        debugEl.textContent = matchCount > 0 ? `(${matchCount})` : "(0)";
        debugEl.style.color = matchCount > 0 ? 'green' : 'red';

    } catch (err) {
        console.error("Search Logic Error:", err);
        alert("Search Error: " + err.message);
    }
};


console.log("Global search (v5-Events) initialized.");

// ---------- ADMIN PANEL LOGIC ----------

function openAdminPanel() {
    generateAdminMenuChecklist();
    const searchInput = document.getElementById('adminMenuSearch');
    if (searchInput) searchInput.value = '';
}

function generateAdminMenuChecklist() {
    const container = document.getElementById('admin-menu-checklist');
    const menuContainer = document.getElementById('mainMenuContainer');
    if (!container || !menuContainer) return;

    container.innerHTML = '';
    const savedSettings = JSON.parse(localStorage.getItem('wolvox_sidebar_visibility') || '{}');

    const topLevelItems = menuContainer.querySelectorAll('.menu > ul > .menu-item');

    let counter = 0;

    function processMenuItem(item, parentContainer, depth = 0) {
        const titleEl = item.querySelector(':scope > a .menu-title');
        if (!titleEl) return;

        const title = titleEl.textContent.trim();
        const subList = item.querySelector(':scope > .sub-menu-list > ul');
        const isHeader = depth === 0;
        const currentId = `admin-item-${counter++}`;

        const wrapper = document.createElement('div');
        wrapper.className = `admin-checklist-item ${isHeader ? 'header' : 'sub'}`;
        wrapper.setAttribute('data-depth', depth);

        // Style based on depth
        let paddingLeft = isHeader ? 10 : (depth * 25);
        let background = isHeader ? '#f8fafc' : 'transparent';
        let fontWeight = isHeader ? '700' : '400';
        let color = isHeader ? '#1e3a8a' : '#475569';
        let borderBottom = isHeader ? '1px solid #f1f5f9' : '1px solid #f8fafc';

        wrapper.style.cssText = `padding:8px 10px 8px ${paddingLeft}px; border-bottom:${borderBottom}; background:${background}; display:flex; align-items:center; gap:10px; transition: background 0.2s;`;
        if (!isHeader) {
            wrapper.onmouseover = () => { if (!wrapper.classList.contains('disabled-parent')) wrapper.style.background = '#f1f5f9'; };
            wrapper.onmouseout = () => { if (!wrapper.classList.contains('disabled-parent')) wrapper.style.background = 'transparent'; };
        }

        if (isHeader) {
            wrapper.textContent = title;
        } else {
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.id = currentId;
            cb.className = 'admin-menu-cb';
            cb.setAttribute('data-menu-title', title);
            cb.checked = savedSettings[title] !== false;

            // Cascading Logic
            cb.onchange = (e) => {
                handleAdminCheckboxChange(wrapper, e.target.checked);
            };

            const label = document.createElement('label');
            label.htmlFor = currentId;
            label.textContent = title;
            label.style.cssText = `font-size: ${14 - depth}px; color:${color}; font-weight:${fontWeight}; cursor:pointer; flex:1;`;

            wrapper.appendChild(cb);
            wrapper.appendChild(label);
        }

        parentContainer.appendChild(wrapper);

        // Process children
        if (subList) {
            const children = subList.querySelectorAll(':scope > .menu-item');
            children.forEach(child => processMenuItem(child, parentContainer, depth + 1));
        }
    }

    topLevelItems.forEach(item => processMenuItem(item, container));
    syncDisabledStates();
}

function handleAdminCheckboxChange(wrapper, isChecked) {
    const depth = parseInt(wrapper.getAttribute('data-depth'));
    const checklist = document.getElementById('admin-menu-checklist');
    const allItems = Array.from(checklist.querySelectorAll('.admin-checklist-item'));
    const index = allItems.indexOf(wrapper);

    // Cascading: Uncheck and Disable all children
    for (let i = index + 1; i < allItems.length; i++) {
        const nextItem = allItems[i];
        const nextDepth = parseInt(nextItem.getAttribute('data-depth'));
        if (nextDepth <= depth) break;

        const nextCb = nextItem.querySelector('input[type="checkbox"]');
        if (nextCb && !isChecked) {
            nextCb.checked = false;
        }
    }
    syncDisabledStates();
}

function syncDisabledStates() {
    const checklist = document.getElementById('admin-menu-checklist');
    const items = Array.from(checklist.querySelectorAll('.admin-checklist-item'));

    items.forEach((item, idx) => {
        const depth = parseInt(item.getAttribute('data-depth'));
        if (depth === 0) return;

        let parentIdx = -1;
        for (let i = idx - 1; i >= 0; i--) {
            if (parseInt(items[i].getAttribute('data-depth')) < depth) {
                parentIdx = i;
                break;
            }
        }

        const cb = item.querySelector('input[type="checkbox"]');
        if (cb && parentIdx !== -1) {
            const parentItem = items[parentIdx];
            const parentCb = parentItem.querySelector('input[type="checkbox"]');

            const isParentChecked = parentCb ? parentCb.checked : true;
            const isParentDisabled = parentItem.classList.contains('disabled-parent');

            if (!isParentChecked || isParentDisabled) {
                cb.checked = false;
                cb.disabled = true;
                item.classList.add('disabled-parent');
                item.style.opacity = '0.5';
                item.style.pointerEvents = 'none';
            } else {
                cb.disabled = false;
                item.classList.remove('disabled-parent');
                item.style.opacity = '1';
                item.style.pointerEvents = 'auto';
            }
        }
    });
}

function filterAdminChecklist(searchText) {
    const val = searchText.toLowerCase().replace(/İ/g, 'i').replace(/I/g, 'ı').trim();
    const items = document.querySelectorAll('.admin-checklist-item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase().replace(/İ/g, 'i').replace(/I/g, 'ı');
        item.style.display = text.includes(val) ? 'flex' : 'none';
    });
}

function toggleAllAdminMenus(state) {
    document.querySelectorAll('.admin-menu-cb:not([disabled])').forEach(cb => {
        cb.checked = state;
        handleAdminCheckboxChange(cb.closest('.admin-checklist-item'), state);
    });
}

function saveAdminMenuSettings() {
    const settings = {};
    document.querySelectorAll('.admin-menu-cb').forEach(cb => {
        settings[cb.getAttribute('data-menu-title')] = cb.checked;
    });
    localStorage.setItem('wolvox_sidebar_visibility', JSON.stringify(settings));
    applySidebarVisibility();
    alert('Menü ayarları kaydedildi ve uygulandı.');
}

function applySidebarVisibility() {
    const savedSettings = JSON.parse(localStorage.getItem('wolvox_sidebar_visibility') || '{}');
    const menuContainer = document.getElementById('mainMenuContainer');
    if (!menuContainer) return;

    menuContainer.querySelectorAll('.menu-item').forEach(li => {
        li.classList.remove('admin-hidden');
        li.style.display = '';
    });

    const menuTitles = menuContainer.querySelectorAll('.menu-title');
    menuTitles.forEach(el => {
        const title = el.textContent.trim();
        const parent = el.closest('.menu-item');
        if (parent && savedSettings[title] === false) {
            parent.classList.add('admin-hidden');
            parent.style.display = 'none';
        }
    });

    const allItems = menuContainer.querySelectorAll('.menu-item');
    allItems.forEach(item => {
        const subList = item.querySelector(':scope > .sub-menu-list');
        if (item.classList.contains('admin-hidden') && subList) {
            subList.querySelectorAll('.menu-item').forEach(child => {
                child.classList.add('admin-hidden');
                child.style.display = 'none';
            });
        }
    });

    const topLevelHeaders = menuContainer.querySelectorAll('.menu > ul > .menu-item');
    topLevelHeaders.forEach(header => {
        const subList = header.querySelector('.sub-menu-list');
        if (subList) {
            const visibleSubItems = subList.querySelectorAll('.menu-item:not(.admin-hidden)');
            if (visibleSubItems.length === 0) header.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', applySidebarVisibility);
applySidebarVisibility();

// --- SİPARİŞ TESLİM RAPORU FILTER TAB SWITCHING ---
function switchStrFilterTab(tabElement, paneId) {
    // 1. Remove active class from all tabs
    const allTabs = document.querySelectorAll('.str-filter-tab');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.background = ''; // reset background
    });

    // 2. Hide all panes
    const allPanes = document.querySelectorAll('.str-filter-pane');
    allPanes.forEach(pane => {
        pane.style.display = 'none';
    });

    // 3. Set clicked tab to active
    tabElement.classList.add('active');
    tabElement.style.background = '#fff';

    // 4. Show target pane
    const targetPane = document.getElementById(paneId);
    if (targetPane) {
        targetPane.style.display = 'block';
    }
}


const originalOpenScreen = window.openScreen;
window.openScreen = function (screenName) {
    if (screenName === 'Admin Paneli' || screenName === 'Admin') {
        // Hide all existing screen content so admin panel replaces current screen
        if (typeof hideAllSpecificViews === 'function') hideAllSpecificViews();
        const screenViewEl = document.getElementById('screenView');
        if (screenViewEl) screenViewEl.style.display = 'none';
        const homeViewEl = document.getElementById('homeView');
        if (homeViewEl) homeViewEl.style.display = 'none';
        const reportView = document.getElementById('siparisTeslimRaporuSatisView');
        if (reportView) reportView.style.display = 'none';

        const adminView = document.getElementById('adminPaneliView');
        if (adminView) {
            adminView.style.display = 'flex';
            openAdminPanel();
        }

        // FULL SCREEN MODE for Admin Panel: Hide sidebars, menubar and header
        const leftPanel = document.getElementById('leftPanel');
        const workhead = document.getElementById('workhead');
        const mainContainer = document.querySelector('.main');
        const topMenuBar = document.querySelector('.menubar');

        if (leftPanel) leftPanel.style.display = 'none';
        if (workhead) workhead.style.display = 'none';
        if (topMenuBar) topMenuBar.style.display = 'none';
        if (mainContainer) mainContainer.style.gridTemplateColumns = '1fr';

        // Use existing updateTabs function instead of non-existent addTab/switchTab
        if (typeof updateTabs === 'function') {
            updateTabs('Admin Paneli');
        }

        const titleEl = document.getElementById('screenTitle');
        if (titleEl) titleEl.textContent = 'Admin Paneli';
        const pathEl = document.getElementById('screenPath');
        if (pathEl) pathEl.textContent = 'Wolvox ERP  ›  Admin Paneli';

        // Ensure workspace scroll is hidden to use internal scroll
        const workspace = document.querySelector('.workspace');
        if (workspace) workspace.style.overflow = 'hidden';

        return;
    }

    // Restore layout if switching away from Admin
    const leftPanel = document.getElementById('leftPanel');
    const workhead = document.getElementById('workhead');
    const mainContainer = document.querySelector('.main');
    const topMenuBar = document.querySelector('.menubar');

    if (leftPanel) leftPanel.style.display = 'flex';
    if (workhead) workhead.style.display = 'flex';
    if (topMenuBar) topMenuBar.style.display = 'flex';
    if (mainContainer) mainContainer.style.gridTemplateColumns = 'var(--leftW) 1fr';

    // Restore workspace scroll when opening other screens
    const workspace = document.querySelector('.workspace');
    if (workspace) workspace.style.overflow = 'auto';

    // Show header return button for 'Sipariş Teslim Raporu (Satış Yönetimi)'
    const returnBtn = document.getElementById('returnToWolvoxBtn');
    if (returnBtn) {
        if (screenName === 'Sipariş Teslim Raporu (Satış Yönetimi)') {
            returnBtn.style.display = 'block';
        } else {
            returnBtn.style.display = 'none';
        }
    }

    // Hide adminPaneliView and masrafFaturasiView when switching to any other screen
    const adminView = document.getElementById('adminPaneliView');
    if (adminView) adminView.style.display = 'none';
    const masrafView = document.getElementById('masrafFaturasiView');
    if (masrafView) masrafView.style.display = 'none';

    if (screenName === 'Masraf Faturası') {
        openMasrafFaturasiModal();
        return;
    }

    if (typeof originalOpenScreen === 'function') {
        // Hide our specific report view before opening standard screens
        const reportView = document.getElementById('siparisTeslimRaporuSatisView');
        if (reportView) reportView.style.display = 'none';
        originalOpenScreen(screenName);
    }
};



// SIPARIS TESLIM RAPORU (SATIS YONETIMI) LOGIC
function siparisMuhasebeModalAc() {
    const modal = document.getElementById('siparis-muhasebe-modal');
    const btn = document.getElementById('btn-faturalandir');

    if (modal) {
        modal.style.display = 'flex';
    }

    if (btn) {
        // Optional: Ensure blue outline stays active via class if needed
        btn.style.outline = '2px solid #3b82f6';
        btn.style.outlineOffset = '-1px';
    }
}

function siparisMuhasebeIptal() {
    const modal = document.getElementById('siparis-muhasebe-modal');
    const btn = document.getElementById('btn-faturalandir');

    if (modal) {
        modal.style.display = 'none';
    }

    if (btn) {
        // Remove outline
        btn.style.outline = 'none';
    }
}

function siparisMuhasebeTamam() {
    siparisMuhasebeIptal(); // Close modal first
    closeSiparisTeslimRaporu();
    openScreen('Yurt İçi Satış Faturası'); // Navigate
}

function closeSiparisTeslimRaporu() {
    showHome();
}

function switchInvoiceBottomTab(el, tabId) {
    // Reset tab classes
    const tabs = el.parentElement.querySelectorAll('.inv-bottom-tab');
    tabs.forEach(t => t.classList.remove('active'));

    // Set active tab
    el.classList.add('active');

    // Hide all panes
    const panes = el.closest('.footer-totals-container, div').querySelectorAll('.inv-bottom-pane');
    panes.forEach(p => p.classList.remove('active'));

    // Show target pane
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
    }
}

function switchMasrafTab(tabName) {
    const tabs = ['fis', 'ithalat'];
    tabs.forEach(t => {
        const header = document.getElementById('masraf-tab-header-' + t);
        const content = document.getElementById('masraf-tab-content-' + t);
        if (header && content) {
            if (t === tabName) {
                header.style.background = '#fff';
                header.style.fontWeight = 'bold';
                header.style.borderBottom = 'none';
                content.style.display = 'block';
            } else {
                header.style.background = '#cbd5e1';
                header.style.fontWeight = 'normal';
                header.style.borderBottom = '1px solid #94a3b8';
                content.style.display = 'none';
            }
        }
    });
}

function openMasrafFaturasiModal() {
    const modal = document.getElementById('masrafFaturasiView');
    const overlay = document.getElementById('masrafModalOverlay');
    if (modal && overlay) {
        modal.style.display = 'flex';
        overlay.style.display = 'block';
    }
}

function closeMasrafFaturasiModal() {
    const modal = document.getElementById('masrafFaturasiView');
    const overlay = document.getElementById('masrafModalOverlay');
    if (modal && overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
}

function openHizliCariAramaModal() {
    const modal = document.getElementById('hizliCariAramaView');
    const overlay = document.getElementById('hizliCariAramaOverlay');
    if (modal && overlay) {
        modal.style.display = 'flex';
        overlay.style.display = 'block';
    }
}

function closeHizliCariAramaModal() {
    const modal = document.getElementById('hizliCariAramaView');
    const overlay = document.getElementById('hizliCariAramaOverlay');
    if (modal && overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
}
function openHizmetAramaModal() {
    const wrapper = document.getElementById('hizmetAramaWrapper');
    const overlay = document.getElementById('hizmetAramaOverlay');
    if (wrapper && overlay) {
        wrapper.style.display = 'block';
        overlay.style.display = 'block';
    }
}

function closeHizmetAramaModal() {
    const wrapper = document.getElementById('hizmetAramaWrapper');
    const overlay = document.getElementById('hizmetAramaOverlay');
    if (wrapper && overlay) {
        wrapper.style.display = 'none';
        overlay.style.display = 'none';
    }
}
function openHizmetTanimlariModal() {
    const wrapper = document.getElementById('hizmetTanimlariWrapper');
    const overlay = document.getElementById('hizmetTanimlariOverlay');
    if (wrapper && overlay) {
        wrapper.style.display = 'block';
        overlay.style.display = 'block';
    }
}

function closeHizmetTanimlariModal() {
    const wrapper = document.getElementById('hizmetTanimlariWrapper');
    const overlay = document.getElementById('hizmetTanimlariOverlay');
    if (wrapper && overlay) {
        wrapper.style.display = 'none';
        overlay.style.display = 'none';
    }
}

// MASRAF FATURASI RAPORU FUNCTIONS
function openMasrafFaturasiRaporu() {
    openScreen('Masraf Faturası Raporu');
}

function closeMasrafFaturasiRaporu() {
    showHome();
}

function switchMfrFilterTab(tabIndex) {
    // Reset all tabs
    for (let i = 1; i <= 5; i++) {
        const tab = document.getElementById('mfr-filter-tab-' + i);
        const content = document.getElementById('mfr-filter-content-' + i);
        if (tab) {
            tab.style.borderBottom = '1px solid #cbd5e1';
            tab.style.background = '#e2e8f0';
            tab.style.fontWeight = 'normal';
        }
        if (content) content.style.display = 'none';
    }

    // Set active tab
    const activeTab = document.getElementById('mfr-filter-tab-' + tabIndex);
    const activeContent = document.getElementById('mfr-filter-content-' + tabIndex);
    if (activeTab) {
        activeTab.style.borderBottom = '2px solid #1e40af';
        activeTab.style.background = '#fff';
        activeTab.style.fontWeight = 'bold';
    }
    if (activeContent) activeContent.style.display = 'flex';
}

function switchMfrSummaryTab(tabIndex) {
    // Reset all tabs
    for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('mfr-summary-tab-' + i);
        const content = document.getElementById('mfr-summary-content-' + i);
        if (tab) {
            tab.style.background = '#e2e8f0';
            tab.style.fontWeight = 'normal';
        }
        if (content) content.style.display = 'none';
    }

    // Set active tab
    const activeTab = document.getElementById('mfr-summary-tab-' + tabIndex);
    const activeContent = document.getElementById('mfr-summary-content-' + tabIndex);
    if (activeTab) {
        activeTab.style.background = '#fff';
        activeTab.style.fontWeight = 'bold';
    }
    if (activeContent) activeContent.style.display = 'block';
}

// HIZMET RAPORU (HAREKETLI) FUNCTIONS
function openHizmetRaporuHareketli() {
    openScreen('Hizmet Haraket Raporu');
}

function closeHizmetRaporuHareketli() {
    showHome();
}

function switchHrhFilterTab(tabIndex) {
    // Reset all tabs
    for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('hrh-filter-tab-' + i);
        const content = document.getElementById('hrh-filter-content-' + i);
        if (tab) {
            tab.style.borderBottom = '1px solid #cbd5e1';
            tab.style.background = '#e2e8f0';
            tab.style.fontWeight = 'normal';
        }
        if (content) content.style.display = 'none';
    }

    // Set active tab
    const activeTab = document.getElementById('hrh-filter-tab-' + tabIndex);
    const activeContent = document.getElementById('hrh-filter-content-' + tabIndex);
    if (activeTab) {
        activeTab.style.borderBottom = '2px solid #1e40af';
        activeTab.style.background = '#fff';
        activeTab.style.fontWeight = 'bold';
    }
    if (activeContent) activeContent.style.display = 'flex';
}





// Extracted from wolvox_arayuz.html
        let isOgeEkleMode = false;

        function openStokBulModal(fromOgeEkle) {
            if (!fromOgeEkle) isOgeEkleMode = false;
            const modal = document.getElementById('stokBulModal');
            if (modal) {
                modal.style.display = 'flex';
                resetModalPosition('stokBulModal', '.sb-modal-content');
            } else {
                console.error('Modal element (stokBulModal) not found!');
            }
        }

        function closeStokBulModal() {
            const modal = document.getElementById('stokBulModal');
            if (modal) modal.style.display = 'none';
        }

        let nakitCleared = false;

        function openNakitModal() {
            const modal = document.getElementById('nakitModal');
            const input = document.getElementById('nakitInput');
            if (modal) {
                modal.style.display = 'flex';
                resetModalPosition('nakitModal', '.nk-modal-content');
                nakitCleared = false;
                // Read live total from sales screen
                const totalEl = document.getElementById('se-total-amount');
                const totalText = totalEl ? totalEl.innerText : '0,00 TL';
                const totalNum = parseFloat(totalText.replace(',', '.').replace(/[^\d.]/g, '')) || 0;
                const totalFmt = totalNum.toFixed(2).replace('.', ',') + ' TL';
                // Populate Toplam row
                const toplamVal = document.getElementById('nkToplamVal');
                if (toplamVal) toplamVal.innerText = totalFmt;
                // Reset input
                if (input) input.value = '0,00';
                // Recalculate
                nakitUpdateCalc();
            }
        }

        // Recalculates Para Üstü whenever input changes
        function nakitUpdateCalc() {
            const input = document.getElementById('nakitInput');
            const toplamVal = document.getElementById('nkToplamVal');
            const odemeVal = document.getElementById('nkOdemeVal');
            const paraUstuVal = document.getElementById('nkParaUstuVal');
            const tlParaUstuVal = document.getElementById('nkTlParaUstuVal');
            if (!input || !toplamVal) return;

            const odeme = parseFloat((input.value || '0').replace(',', '.')) || 0;
            const toplam = parseFloat(toplamVal.innerText.replace(',', '.').replace(/[^\d.]/g, '')) || 0;
            const paraUstu = Math.max(0, odeme - toplam);

            const fmt = n => n.toFixed(2).replace('.', ',') + ' TL';
            if (odemeVal) odemeVal.innerText = fmt(odeme);
            if (paraUstuVal) paraUstuVal.innerText = fmt(paraUstu);
            if (tlParaUstuVal) tlParaUstuVal.innerText = fmt(paraUstu);
        }

        function closeNakitModal() {
            const modal = document.getElementById('nakitModal');
            if (modal) modal.style.display = 'none';
        }

        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error('Tam ekran hatası:', err);
                });
            } else {
                document.exitFullscreen();
            }
        }

        // Update button label when fullscreen state changes (e.g. ESC pressed)
        document.addEventListener('fullscreenchange', function () {
            const btn = document.getElementById('tamEkranBtn');
            const icon = document.getElementById('tamEkranIcon');
            const label = document.getElementById('tamEkranLabel');
            if (!btn) return;
            if (document.fullscreenElement) {
                if (label) label.innerText = 'Tam Ekrandan Çık';
                if (icon) { icon.className = 'bi bi-fullscreen-exit'; }
            } else {
                if (label) label.innerText = 'Tam Ekran';
                if (icon) { icon.className = 'bi bi-fullscreen'; }
            }
        });

        function openBeklemeListesiModal() {
            const modal = document.getElementById('beklemeListesiModal');
            if (modal) {
                modal.style.display = 'flex';
                resetModalPosition('beklemeListesiModal', '.bl-modal-content');
            }
        }

        function closeBeklemeListesiModal() {
            const modal = document.getElementById('beklemeListesiModal');
            if (modal) modal.style.display = 'none';
        }


        function openIndirimModal() {
            const modal = document.getElementById('indirimModal');
            if (modal) {
                modal.style.display = 'flex';
                resetModalPosition('indirimModal', '.ind-modal-content');
            }
        }

        function closeIndirimModal() {
            const modal = document.getElementById('indirimModal');
            if (modal) modal.style.display = 'none';
        }

        function openIndirimGirisi(tip) {
            const modal = document.getElementById('indirimGirisiModal');
            const input = document.getElementById('igInput');
            const unit = document.getElementById('igUnit');
            if (modal) {
                modal.style.display = 'flex';
                resetModalPosition('indirimGirisiModal', '.ig-modal-content');
                if (input) input.value = '0';
                if (unit) unit.textContent = tip === 'oran' ? '%' : 'TL';
            }
        }

        function closeIndirimGirisi() {
            const modal = document.getElementById('indirimGirisiModal');
            if (modal) modal.style.display = 'none';
        }

        function igAppend(char) {
            const input = document.getElementById('igInput');
            if (!input) return;
            if (input.value === '0' && char !== ',') {
                input.value = char;
            } else {
                input.value += char;
            }
        }

        function igDelete() {
            const input = document.getElementById('igInput');
            if (!input) return;
            if (input.value.length <= 1) {
                input.value = '0';
            } else {
                input.value = input.value.slice(0, -1);
            }
        }

        function openBeklemeyeAlModal() {
            const modal = document.getElementById('beklemeyeAlModal');
            if (modal) {
                modal.style.display = 'flex';
                resetModalPosition('beklemeyeAlModal', '.ba-modal-content');
            }
        }

        function closeBeklemeyeAlModal() {
            const modal = document.getElementById('beklemeyeAlModal');
            if (modal) modal.style.display = 'none';
        }

        function toggleEditMode() {
            const topPanel = document.getElementById('editModeTopPanel');
            const bottomPanel = document.getElementById('editModeBottomPanel');
            const ogeMenu = document.getElementById('ogeEkleMenu');
            if (topPanel && bottomPanel) {
                if (topPanel.style.display === 'none') {
                    topPanel.style.display = 'flex';
                    bottomPanel.style.display = 'flex';
                } else {
                    topPanel.style.display = 'none';
                    bottomPanel.style.display = 'none';
                    if (ogeMenu) ogeMenu.style.display = 'none'; // Also close context menu
                }
            }
        }

        function toggleOgeEkleMenu(event) {
            const menu = document.getElementById('ogeEkleMenu');
            if (!menu) return;

            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
                // Position menu above or near the button, but center on mobile
                if (window.innerWidth < 900) {
                    menu.style.position = 'fixed';
                    menu.style.left = '50%';
                    menu.style.top = '50%';
                    menu.style.transform = 'translate(-50%, -50%)';
                    menu.style.zIndex = '100000020';
                } else {
                    menu.style.position = 'absolute';
                    menu.style.transform = 'none';
                    const btnRect = event.currentTarget.getBoundingClientRect();
                    menu.style.left = btnRect.left + 'px';
                    menu.style.top = (btnRect.top - menu.offsetHeight - 5) + 'px';
                }
            }
        }

        function clickStokEkleMenu() {
            const menu = document.getElementById('ogeEkleMenu');
            if (menu) menu.style.display = 'none';
            isOgeEkleMode = true;
            openStokBulModal(true);
        }

        let currentGroup = 'İçecekler';
        const groupData = {
            'İçecekler': [],
            'Yemekler': [],
            'Tatlılar': [],
            'Atıştırmalıklar': []
        };

        /* ---- Görünüm Ayarla Dropdown styles (inline JS section, inside <style>) ---- */

        function toggleGorunumMenu(e) {
            e.stopPropagation();
            const menu = document.getElementById('gorunumDropdown');
            if (!menu) return;
            const isVisible = menu.style.display !== 'none';
            // Close all, then maybe open this one
            closeGorunumMenu();
            if (!isVisible) {
                menu.style.display = 'block';
                // position relative to parent
                const parent = e.currentTarget.parentElement;
                if (parent) parent.style.position = 'relative';
            }
        }

        function closeGorunumMenu() {
            const menu = document.getElementById('gorunumDropdown');
            if (menu) menu.style.display = 'none';
        }

        document.addEventListener('click', function (e) {
            if (!e.target.closest('#gorunumAyarlaBtn') && !e.target.closest('#gorunumDropdown')) {
                closeGorunumMenu();
            }
        });

        function openKisayolAyarlaModal() {
            const overlay = document.getElementById('kisayolAyarlaOverlay');
            if (!overlay) return;
            overlay.style.display = 'block';
            // Position panel roughly in the center
            const panel = document.getElementById('kisayolAyarlaPanel');
            if (panel) {
                panel.style.left = '50%';
                panel.style.top = '50%';
                panel.style.transform = 'translate(-50%, -50%)';
            }
            // Sync sliders with current values
            const items = document.querySelectorAll('.se-product-item');
            const grid = document.querySelector('.se-product-grid');
            if (items.length > 0) {
                const fs = parseInt(getComputedStyle(items[0]).fontSize) || 11;
                const sliderFs = document.getElementById('sliderYaziBoyutu');
                if (sliderFs) { sliderFs.value = fs; document.getElementById('lblYaziBoyutu').textContent = fs + 'px'; }
            }
            if (grid) {
                const rowH = parseInt(getComputedStyle(grid).gridAutoRows) || 80;
                const sliderH = document.getElementById('sliderYukseklik');
                if (sliderH) { sliderH.value = rowH; document.getElementById('lblYukseklik').textContent = rowH + 'px'; }
            }
        }

        function closeKisayolAyarlaModal() {
            const overlay = document.getElementById('kisayolAyarlaOverlay');
            if (overlay) overlay.style.display = 'none';
        }

        function previewKisayolAyarla() {
            const w = document.getElementById('sliderGenislik').value;
            const h = document.getElementById('sliderYukseklik').value;
            const fs = document.getElementById('sliderYaziBoyutu').value;
            document.getElementById('lblGenislik').textContent = w + 'px';
            document.getElementById('lblYukseklik').textContent = h + 'px';
            document.getElementById('lblYaziBoyutu').textContent = fs + 'px';

            // Live preview on product items
            const items = document.querySelectorAll('.se-product-item');
            items.forEach(item => {
                item.style.minWidth = w + 'px';
                item.style.minHeight = h + 'px';
                item.style.fontSize = fs + 'px';
            });
            // Update grid row height
            const grid = document.querySelector('.se-product-grid');
            if (grid) grid.style.gridAutoRows = h + 'px';
        }

        function applyKisayolAyarla() {
            previewKisayolAyarla(); // Ensure applied
            closeKisayolAyarlaModal();
        }

        function openGrupAdiModal() {
            const overlay = document.getElementById('grupAdiModalOverlay');
            if (overlay) {
                overlay.style.display = 'flex';
                const input = document.getElementById('grupAdiInput');
                if (input) { input.value = ''; input.focus(); }
            }
        }

        function closeGrupAdiModal() {
            const overlay = document.getElementById('grupAdiModalOverlay');
            if (overlay) overlay.style.display = 'none';
        }

        function addNewGroup() {
            const input = document.getElementById('grupAdiInput');
            if (!input) return;
            const name = input.value.trim();
            if (!name) { input.focus(); return; }

            // Avoid duplicate group names
            if (groupData[name]) {
                alert('Bu isimde bir grup zaten mevcut.');
                input.focus();
                return;
            }

            // Add to data model
            groupData[name] = [];

            // Add button to the group bar
            const groupBar = document.querySelector('.se-groups');
            if (groupBar) {
                const btn = document.createElement('div');
                btn.className = 'se-group-btn';
                btn.textContent = name;
                btn.onclick = function () { switchGroup(name, btn); };
                groupBar.appendChild(btn);
            }

            closeGrupAdiModal();
        }

        function switchGroup(groupName, element) {
            currentGroup = groupName;

            // Reset all buttons style
            const btns = document.querySelectorAll('.se-group-btn');
            btns.forEach(btn => {
                btn.style.background = '#f5f5f5';
            });

            // Set active button style
            element.style.background = 'linear-gradient(#e0ebd5, #c6dfb4)';

            renderProductGrid();
        }

        function renderProductGrid() {
            const grid = document.getElementById('se-product-grid') || document.querySelector('.se-product-grid');
            if (!grid) return;

            // Clear current items
            grid.innerHTML = '';

            // Render items from current group array
            const items = groupData[currentGroup] || [];
            items.forEach((itemText, index) => {
                const newItem = document.createElement('div');
                newItem.className = 'se-product-item';
                newItem.innerText = itemText;
                newItem.dataset.index = index;
                newItem.dataset.itemtext = itemText; // store for click handler
                newItem.addEventListener('click', function () { sePosItemClick(this); });
                grid.appendChild(newItem);
            });
        }


        function addStokToGrid(rowElement) {
            // Only add to the product grid if in Öğe Ekle mode
            if (!isOgeEkleMode) {
                closeStokBulModal();
                return;
            }

            const cols = rowElement.querySelectorAll('td');
            if (cols.length < 4) return;
            const stokAdi = cols[2].innerText.trim();
            const fiyat = cols[3] ? cols[3].innerText.trim() : '0,00';
            const itemText = stokAdi + ' ' + fiyat + ' TL - Adet';

            // Prevent duplicate: check if this item is already in the CURRENT group
            const existingItems = groupData[currentGroup] || [];
            const isDuplicate = existingItems.some(item => item.toLowerCase().startsWith(stokAdi.toLowerCase()));
            if (isDuplicate) {
                alert('"' + stokAdi + '" zaten "' + currentGroup + '" grubunda mevcut.');
                return;
            }

            // Add to current group's data model
            groupData[currentGroup].push(itemText);

            // Re-render the grid
            renderProductGrid();
            closeStokBulModal();
            isOgeEkleMode = false;
        }

        // Called when a product button on the right grid is left-clicked.
        // Adds the product price to the running total and inserts a row in the sales table.
        function sePosItemClick(itemEl) {
            const itemText = itemEl.dataset.itemtext || itemEl.innerText || '';

            // --- Extract stok adÄ± and fiyat from text like "Patates KÄ±zartmasÄ± 40,00 TL - Adet" ---
            // Format: "<Stok AdÄ±> <fiyat>,<nn> TL - <birim>"
            const match = itemText.match(/^(.+?)\s+([\d.,]+)\s+TL\s+-\s+(.+)$/);
            let stokAdi = itemText;
            let fiyatStr = '0,00';
            let birim = 'Adet';
            if (match) {
                stokAdi = match[1].trim();
                fiyatStr = match[2].trim();
                birim = match[3].trim();
            }

            // Convert price string to number (replace comma with dot)
            const fiyatNum = parseFloat(fiyatStr.replace(',', '.')) || 0;

            // --- Add row to sales table ---
            const tbody = document.getElementById('se-sales-tbody');
            if (tbody) {
                // Check if this product is already in the table -> just increment quantity
                let existingRow = null;
                for (const row of tbody.rows) {
                    if (row.cells[1] && row.cells[1].innerText.trim() === stokAdi) {
                        existingRow = row;
                        break;
                    }
                }

                if (existingRow) {
                    // Increment quantity
                    const qtyCell = existingRow.cells[3];
                    const kdvliCell = existingRow.cells[5];
                    const currentQty = parseInt(qtyCell.innerText) || 0;
                    const newQty = currentQty + 1;
                    qtyCell.innerText = newQty;
                    if (kdvliCell) kdvliCell.innerText = (fiyatNum * newQty).toFixed(2).replace('.', ',');
                } else {
                    // Insert new row
                    const row = tbody.insertRow();
                    row.innerHTML = `
                        <td><i class="bi bi-caret-right-fill"></i></td>
                        <td>${stokAdi}</td>
                        <td>20</td>
                        <td>1</td>
                        <td>${fiyatStr}</td>
                        <td>${fiyatStr}</td>
                        <td>0</td>
                    `;
                }
            }

            // --- Update running total ---
            const totalEl = document.getElementById('se-total-amount');
            if (totalEl) {
                const currentText = totalEl.innerText.replace(',', '.').replace(/[^\d.]/g, '');
                const currentVal = parseFloat(currentText) || 0;
                const newVal = currentVal + fiyatNum;
                totalEl.innerText = newVal.toFixed(2).replace('.', ',') + ' TL';
            }

            // --- Visual feedback: briefly highlight the button ---
            itemEl.style.background = '#d4edda';
            setTimeout(() => { itemEl.style.background = ''; }, 300);
        }
        let selectedProductItem = null;

        document.addEventListener('DOMContentLoaded', function () {
            // Initialize product grid
            renderProductGrid();

            // ... existing DOMContentLoaded code if any, else we just attach contextmenu here
            const productGrid = document.querySelector('.se-product-grid');
            if (productGrid) {
                productGrid.addEventListener('contextmenu', function (e) {
                    const item = e.target.closest('.se-product-item');
                    if (item) {
                        const bottomPanel = document.getElementById('editModeBottomPanel');
                        const isEditMode = bottomPanel && bottomPanel.style.display !== 'none';
                        if (!isEditMode) return; // Do not show context menu if not in Edit Mode

                        e.preventDefault(); // Prevent default browser right-click menu
                        selectedProductItem = item;

                        const menu = document.getElementById('itemContextMenu');
                        if (menu) {
                            menu.style.display = 'block';

                            const removeBtn = document.getElementById('menuItemRemove');
                            if (removeBtn) {
                                removeBtn.style.display = 'block';
                            }

                            // Adjust positioning to stay within window bounds
                            let leftPos = e.pageX;
                            let topPos = e.pageY;

                            if (leftPos + menu.offsetWidth > window.innerWidth) {
                                leftPos = window.innerWidth - menu.offsetWidth - 5;
                            }
                            if (topPos + menu.offsetHeight > window.innerHeight) {
                                topPos = window.innerHeight - menu.offsetHeight - 5;
                            }

                            menu.style.left = leftPos + 'px';
                            menu.style.top = topPos + 'px';
                        }
                    }
                });

                // Mobile: also trigger on long-press (basılı tutunca) if in Edit Mode
                let touchTimer;
                productGrid.addEventListener('touchstart', function (e) {
                    if (window.innerWidth >= 900) return;
                    const item = e.target.closest('.se-product-item');
                    if (item) {
                        touchTimer = setTimeout(() => {
                            const bottomPanel = document.getElementById('editModeBottomPanel');
                            const isEditMode = bottomPanel && bottomPanel.style.display !== 'none';
                            if (!isEditMode) return;

                            e.preventDefault();
                            selectedProductItem = item;
                            const menu = document.getElementById('itemContextMenu');
                            if (menu) {
                                menu.style.display = 'block';
                                menu.style.position = 'fixed';
                                menu.style.left = '50%';
                                menu.style.top = '15%';
                                menu.style.transform = 'translateX(-50%)';
                                menu.style.zIndex = '100000050';
                                menu.style.margin = '0'; // Photo 1: prevent edge-sticking
                            }
                        }, 500);
                    }
                }, { passive: false });

                productGrid.addEventListener('touchend', function () {
                    clearTimeout(touchTimer);
                });
                productGrid.addEventListener('touchmove', function () {
                    clearTimeout(touchTimer);
                });
            }
            makeDraggable('stokBulModal', '.sb-modal-header', '.sb-modal-content');
            makeDraggable('nakitModal', '.nk-modal-header', '.nk-modal-content');
            makeDraggable('beklemeyeAlModal', '.ba-modal-header', '.ba-modal-content');
            makeDraggable('beklemeListesiModal', '.bl-modal-header', '.bl-modal-content');
            makeDraggable('indirimModal', '.ind-modal-header', '.ind-modal-content');
        });

        function closeItemMenu() {
            const menu = document.getElementById('itemContextMenu');
            if (menu) menu.style.display = 'none';
        }

        function removeSelectedItem() {
            if (selectedProductItem) {
                const indexToRemove = selectedProductItem.dataset.index;
                if (indexToRemove !== undefined) {
                    groupData[currentGroup].splice(indexToRemove, 1);
                    renderProductGrid();
                }
                selectedProductItem = null;
            }
            closeItemMenu();
        }

        // Close context menus if clicked outside
        document.addEventListener('click', function (event) {
            const ogeMenu = document.getElementById('ogeEkleMenu');
            const ogeBtn = document.getElementById('ogeEkleBtn');
            if (ogeMenu && ogeMenu.style.display === 'block') {
                if (!ogeMenu.contains(event.target) && event.target !== ogeBtn && !ogeBtn.contains(event.target)) {
                    ogeMenu.style.display = 'none';
                }
            }

            const itemMenu = document.getElementById('itemContextMenu');
            if (itemMenu && itemMenu.style.display === 'block') {
                if (!itemMenu.contains(event.target)) {
                    itemMenu.style.display = 'none';
                }
            }
        });

        function nakitSetAmount(amount) {
            const input = document.getElementById('nakitInput');
            if (input) {
                input.value = amount;
                nakitCleared = true;
                nakitUpdateCalc();
            }
        }

        function nakitAppendChar(char) {
            const input = document.getElementById('nakitInput');
            if (input) {
                if (!nakitCleared) {
                    if (char === ',') input.value = '0,';
                    else input.value = char;
                    nakitCleared = true;
                } else {
                    input.value += char;
                }
                nakitUpdateCalc();
            }
        }

        function nakitDeleteChar() {
            const input = document.getElementById('nakitInput');
            if (input) {
                if (!nakitCleared) {
                    input.value = '0';
                    nakitCleared = true;
                } else {
                    input.value = input.value.slice(0, -1);
                    if (input.value === '') {
                        input.value = '0';
                        nakitCleared = false;
                    }
                }
                nakitUpdateCalc();
            }
        }



        function switchSbTab(el, tabId) {
            // Update tab buttons
            const tabs = el.parentElement.querySelectorAll('.sb-tab');
            tabs.forEach(t => t.classList.remove('active'));
            el.classList.add('active');

            // Update content visibility
            const sidebar = el.closest('.sb-sidebar');
            const contents = sidebar.querySelectorAll('.sb-tab-content');
            contents.forEach(c => c.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        }

        function switchBlTab(el, tabId) {
            const container = el.closest('.bl-tabs-container');
            const tabs = container.querySelectorAll('.bl-tab');
            tabs.forEach(t => t.classList.remove('active'));
            el.classList.add('active');

            const wrapper = el.closest('.bl-modal-body').querySelector('.bl-tab-content-wrapper');
            const contents = wrapper.querySelectorAll('.bl-tab-content');
            contents.forEach(c => c.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        }

        // Draggable Modals Logic
        function resetModalPosition(modalId, contentSelector) {
            const modal = document.getElementById(modalId);
            if (!modal) return;
            const content = modal.querySelector(contentSelector);
            if (content) {
                content.style.position = 'relative';
                content.style.left = '0';
                content.style.top = '0';
                content.style.margin = 'none';
            }
        }

        function makeDraggable(modalId, headerSelector, contentSelector) {
            const modal = document.getElementById(modalId);
            if (!modal) return;
            const header = modal.querySelector(headerSelector);
            const content = modal.querySelector(contentSelector);
            if (!header || !content) return;

            let isDragging = false;
            let startX, startY, initialLeft, initialTop;

            header.style.cursor = 'move';

            header.addEventListener('mousedown', function (e) {
                if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('button') || 
                    e.target.tagName.toLowerCase() === 'input' || e.target.closest('input') || 
                    e.target.tagName.toLowerCase() === 'select') {
                    return;
                }
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;

                const rect = content.getBoundingClientRect();
                content.style.position = 'fixed';
                content.style.margin = '0';
                content.style.transform = 'none';
                content.style.transition = 'none';
                content.style.left = rect.left + 'px';
                content.style.top = rect.top + 'px';
                content.style.width = rect.width + 'px';
                content.style.height = rect.height + 'px';

                initialLeft = rect.left;
                initialTop = rect.top;
                e.preventDefault();
            });

            document.addEventListener('mousemove', function (e) {
                if (!isDragging) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                content.style.left = (initialLeft + dx) + 'px';
                content.style.top = (initialTop + dy) + 'px';
            });

            document.addEventListener('mouseup', function () {
                isDragging = false;
            });
        }

        document.addEventListener('DOMContentLoaded', function () {
            makeDraggable('stokBulModal', '.sb-modal-header', '.sb-modal-content');
            makeDraggable('nakitModal', '.nk-modal-header', '.nk-modal-content');
            makeDraggable('beklemeyeAlModal', '.ba-modal-header', '.ba-modal-content');
            makeDraggable('beklemeListesiModal', '.bl-modal-header', '.bl-modal-content');
            makeDraggable('indirimModal', '.ind-modal-header', '.ind-modal-content');
            makeDraggable('hizmetAramaWrapper', '.hizmet-arama-header', '.hizmet-arama-content');
            makeDraggable('hizliCariAramaView', '.hca-header', '#hizliCariAramaView');
            makeDraggable('masrafFaturasiView', '.masraf-header', '#masrafFaturasiView');
            makeDraggable('hizmetTanimlariWrapper', '.ht-modal-header', '.ht-modal-content');
        });

/* Masraf Faturasi Raporu - Filter Toggle for Mobile */
function toggleMfrFilter() {
    const sidebar = document.getElementById('mfr-filter-panel');
    const overlay = document.getElementById('mfr-sidebar-overlay');
    if (!sidebar) return;
    
    if (sidebar.style.transform === 'translateX(0px)') {
        sidebar.style.transform = 'translateX(-100%)';
        if (overlay) overlay.style.display = 'none';
    } else {
        sidebar.style.transform = 'translateX(0px)';
        if (overlay) overlay.style.display = 'block';
    }
}
