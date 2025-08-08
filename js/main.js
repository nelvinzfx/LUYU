      // Global state management
      let currentPage = 'dashboard';
      let userData = {
      balance: 185000,
      infaqBalance: 35000,
      pahalaPoints: 230,
      totalTrips: 127,
      settings: {
          autoZakat: true,
          autoInfaq: true,
          balanceNotification: true
      }
      };
      
      // Driver data
      const driverData = {
          siti: {
              name: 'Ustadzah Siti',
              cluster: 'C',
              vehicle: 'Honda Beat',
              rating: 4.9,
              distance: '1.2 km',
              status: 'online',
              priority: true,
              earnings: 'Rp 125.000/hari',
              trips: 47,
              phone: '+62 812-3456-7890',
              joinDate: '15 Januari 2024'
          },
          ahmad: {
              name: 'Pak Ahmad',
              cluster: 'C',
              vehicle: 'Yamaha Mio',
              rating: 4.8,
              distance: '1.8 km',
              status: 'online',
              priority: true,
              earnings: 'Rp 118.000/hari',
              trips: 52,
              phone: '+62 813-2345-6789',
              joinDate: '3 Februari 2024'
          },
          budi: {
              name: 'Budi',
              cluster: 'A',
              vehicle: 'Honda Vario',
              rating: 4.7,
              distance: '2.1 km',
              status: 'online',
              priority: false,
              earnings: 'Rp 285.000/hari',
              trips: 128,
              phone: '+62 814-3456-7890',
              joinDate: '10 Desember 2023'
          },
          driver1: { name: 'Driver 1', cluster: 'A', vehicle: 'Honda', rating: 4.5, distance: '3.2 km', status: 'online', priority: false, trips: 34 },
          driver2: { name: 'Driver 2', cluster: 'A', vehicle: 'Yamaha', rating: 4.6, distance: '2.8 km', status: 'online', priority: false, trips: 28 },
          driver3: { name: 'Driver 3', cluster: 'A', vehicle: 'Suzuki', rating: 4.4, distance: '4.1 km', status: 'online', priority: false, trips: 41 },
          driver4: { name: 'Driver 4', cluster: 'B', vehicle: 'Honda', rating: 4.7, distance: '1.9 km', status: 'online', priority: false, trips: 67 },
          driver5: { name: 'Driver 5', cluster: 'B', vehicle: 'Yamaha', rating: 4.8, distance: '2.3 km', status: 'online', priority: false, trips: 53 },
          driver8: { name: 'Driver 8', cluster: 'C', vehicle: 'Honda', rating: 4.9, distance: '1.5 km', status: 'online', priority: true, trips: 72 },
          driver9: { name: 'Driver 9', cluster: 'C', vehicle: 'Yamaha', rating: 4.8, distance: '2.0 km', status: 'online', priority: true, trips: 48 },
          moving1: { name: 'Moving Driver', cluster: 'C', vehicle: 'Honda', rating: 4.7, distance: '1.8 km', status: 'busy', priority: true, trips: 35 }
      };
      
      // Orders data
      const ordersData = {
          'ORD001': {
              id: 'ORD001',
              status: 'ongoing',
              from: 'Jl. Sudirman',
              to: 'Masjid Al-Barokah',
              driver: 'Ustadzah Siti',
              vehicle: 'Honda Beat',
              cluster: 'C',
              price: 15000,
              time: '30 Mei 2025, 14:30',
              progress: 75,
              eta: '8 menit'
          },
          'ORD002': {
              id: 'ORD002',
              status: 'completed',
              from: 'Rumah',
              to: 'Pasar Tradisional',
              driver: 'Pak Ahmad',
              vehicle: 'Yamaha Mio',
              cluster: 'C',
              price: 12500,
              time: '30 Mei 2025, 13:15',
              progress: 100,
              eta: 'Selesai'
          },
          'ORD003': {
              id: 'ORD003',
              status: 'pending',
              from: 'Plaza Indonesia',
              to: 'Kemang',
              driver: null,
              vehicle: null,
              cluster: 'A',
              price: 25000,
              time: '30 Mei 2025, 15:45',
              progress: 20,
              eta: '5 menit'
          },
          'ORD004': {
              id: 'ORD004',
              status: 'pickup',
              from: 'Bandung Station',
              to: 'Dago',
              driver: 'Bu Fatimah',
              vehicle: 'Honda Scoopy',
              cluster: 'B',
              price: 18000,
              time: '30 Mei 2025, 15:20',
              progress: 45,
              eta: 'Driver menuju lokasi'
          },
          'ORD005': {
              id: 'ORD005',
              status: 'cancelled',
              from: 'Tangerang Mall',
              to: 'BSD',
              driver: null,
              vehicle: null,
              cluster: 'C',
              price: 22000,
              time: '30 Mei 2025, 12:00',
              progress: 0,
              eta: 'Dibatalkan'
          }
      };
      
      // Charts instances
      let revenueChart = null;
      let clusterCharts = {};
      let impactChart = null;
      
      // Page management
      function showPage(pageId) {
      try {
      currentPage = pageId;
      
      document.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.remove('bg-luyu-green/10', 'text-luyu-green');
      item.classList.add('text-gray-700');
      });
      
      const activeItem = document.querySelector(`[data-page="${pageId}"]`);
      if (activeItem) {
      activeItem.classList.remove('text-gray-700');
      activeItem.classList.add('bg-luyu-green/10', 'text-luyu-green');
      }
      
      updatePageHeader(pageId);
      loadPageContent(pageId);
      
      // Close mobile sidebar after navigation
      if (window.innerWidth <= 1024) {
      setTimeout(() => {
          closeMobileSidebar();
      }, 100);
      }
      } catch (error) {
      console.error('Error in showPage:', error);
      showNotification('Terjadi kesalahan saat memuat halaman', 'error');
      }
      }
      
      function updatePageHeader(pageId) {
          try {
              const titles = {
                  dashboard: { title: "Assalamu'alaikum, Ahmad!", subtitle: "Semoga hari ini penuh berkah dan kebaikan" },
                  maps: { title: "Peta Cluster", subtitle: "Monitoring driver dan wilayah real-time" },
                  orders: { title: "Kelola Pesanan", subtitle: "Pantau dan kelola semua pesanan Anda" },
                  wallet: { title: "Dompet Syariah", subtitle: "Kelola keuangan dengan prinsip syariah" },
                  analytics: { title: "Analitik & Laporan", subtitle: "Insight mendalam untuk bisnis yang lebih baik" },
                  zakat: { title: "Zakat & Infaq", subtitle: "Berbagi rezeki dengan sesama" },
                  wakaf: { title: "Wakaf Digital", subtitle: "Investasi akhirat yang berkelanjutan" },
                  kajian: { title: "Kajian Online", subtitle: "Menambah ilmu agama bersama para ustadz" },
                  settings: { title: "Pengaturan", subtitle: "Personalisasi aplikasi sesuai kebutuhan" }
              };
      
              const pageInfo = titles[pageId] || { title: "LUYU Platform", subtitle: "Ojol Syariah Terpercaya" };
              
              const titleElement = document.getElementById('page-title');
              const subtitleElement = document.getElementById('page-subtitle');
              
              if (titleElement) titleElement.textContent = pageInfo.title;
              if (subtitleElement) subtitleElement.textContent = pageInfo.subtitle;
          } catch (error) {
              console.error('Error in updatePageHeader:', error);
          }
      }
      
      function loadPageContent(pageId) {
          try {
              const contentArea = document.getElementById('main-content');
              const template = document.getElementById(`${pageId}-template`);
              
              if (template && contentArea) {
                  contentArea.innerHTML = template.innerHTML;
                  
                  // Initialize page-specific functionality
                  switch(pageId) {
                      case 'analytics':
                          setTimeout(() => initializeAnalytics(), 100);
                          break;
                      case 'wallet':
                          setTimeout(() => initializeWalletEvents(), 100);
                          break;
                      case 'maps':
                          setTimeout(() => initializeMapEvents(), 100);
                          break;
                      case 'orders':
                          setTimeout(() => initializeOrdersEvents(), 100);
                          break;
                      default:
                          break;
                  }
              } else {
                  if (contentArea) {
                      contentArea.innerHTML = generateFallbackContent(pageId);
                  }
              }
          } catch (error) {
              console.error('Error in loadPageContent:', error);
              showNotification('Gagal memuat konten halaman', 'error');
          }
      }
      
      function generateFallbackContent(pageId) {
          return `
              <div class="animate-fade-in">
                  <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                      <div class="w-20 h-20 bg-luyu-green/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <svg class="w-10 h-10 text-luyu-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                          </svg>
                      </div>
                      <h2 class="text-2xl font-bold text-gray-800 mb-4">Halaman ${pageId.charAt(0).toUpperCase() + pageId.slice(1)}</h2>
                      <p class="text-gray-600 mb-6">Fitur ini sedang dalam pengembangan dan akan segera tersedia.</p>
                      <button class="bg-luyu-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-luyu-green/90 transition-all" onclick="showPage('dashboard')">
                          Kembali ke Dashboard
                      </button>
                  </div>
              </div>
          `;
      }
      
      // Analytics functionality
      function initializeAnalytics() {
          try {
              initializeCharts();
              startAnalyticsUpdates();
          } catch (error) {
              console.error('Error in initializeAnalytics:', error);
          }
      }
      
      function initializeCharts() {
          try {
              // Revenue Chart
              const revenueCtx = document.getElementById('revenue-chart');
              if (revenueCtx && typeof Chart !== 'undefined') {
                  if (revenueChart) {
                      revenueChart.destroy();
                  }
                  
                  revenueChart = new Chart(revenueCtx, {
                      type: 'line',
                      data: {
                          labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                          datasets: [{
                              label: 'Revenue (Juta)',
                              data: [1.2, 1.9, 3.0, 5.0, 2.0, 3.0, 4.5],
                              borderColor: '#2ecc71',
                              backgroundColor: 'rgba(46, 204, 113, 0.1)',
                              tension: 0.4,
                              fill: true
                          }, {
                              label: 'Zakat (Juta)',
                              data: [0.03, 0.048, 0.075, 0.125, 0.05, 0.075, 0.113],
                              borderColor: '#f1c40f',
                              backgroundColor: 'rgba(241, 196, 15, 0.1)',
                              tension: 0.4,
                              fill: true
                          }]
                      },
                      options: {
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                              legend: {
                                  display: true,
                                  position: 'top'
                              },
                              tooltip: {
                                  mode: 'index',
                                  intersect: false,
                                  callbacks: {
                                      label: function(context) {
                                          return context.dataset.label + ': Rp ' + context.parsed.y + 'M';
                                      }
                                  }
                              }
                          },
                          scales: {
                              x: {
                                  display: true,
                                  title: {
                                      display: true,
                                      text: 'Hari'
                                  }
                              },
                              y: {
                                  display: true,
                                  title: {
                                      display: true,
                                      text: 'Jumlah (Juta Rupiah)'
                                  },
                                  ticks: {
                                      callback: function(value) {
                                          return 'Rp ' + value + 'M';
                                      }
                                  }
                              }
                          }
                      }
                  });
              }
      
              // Cluster Performance Charts
              const clusters = ['a', 'b', 'c'];
              const clusterData = [85, 72, 95];
              const clusterColors = ['#3498db', '#f39c12', '#2ecc71'];
              const clusterLabels = ['Jakarta', 'Bandung', 'Banten'];
              
              clusters.forEach((cluster, index) => {
                  const ctx = document.getElementById(`cluster-${cluster}-chart`);
                  if (ctx && typeof Chart !== 'undefined') {
                      if (clusterCharts[cluster]) {
                          clusterCharts[cluster].destroy();
                      }
                      
                      clusterCharts[cluster] = new Chart(ctx, {
                          type: 'doughnut',
                          data: {
                              datasets: [{
                                  data: [clusterData[index], 100 - clusterData[index]],
                                  backgroundColor: [clusterColors[index], '#f3f4f6'],
                                  borderWidth: 0,
                                  cutout: '70%'
                              }]
                          },
                          options: {
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                  legend: {
                                      display: false
                                  },
                                  tooltip: {
                                      callbacks: {
                                          label: function(context) {
                                              if (context.dataIndex === 0) {
                                                  return `${clusterLabels[index]}: ${clusterData[index]}%`;
                                              }
                                              return '';
                                          }
                                      }
                                  }
                              }
                          },
                          plugins: [{
                              beforeDraw: function(chart) {
                                  const ctx = chart.ctx;
                                  ctx.save();
                                  const fontSize = Math.max(chart.height / 8, 12);
                                  ctx.font = fontSize + "px sans-serif";
                                  ctx.textBaseline = "middle";
                                  ctx.fillStyle = clusterColors[index];
                                  
                                  const text = clusterData[index] + "%";
                                  const textX = Math.round((chart.width - ctx.measureText(text).width) / 2);
                                  const textY = chart.height / 2;
                                  
                                  ctx.fillText(text, textX, textY);
                                  ctx.restore();
                              }
                          }]
                      });
                  }
              });
      
              // Impact Chart
              const impactCtx = document.getElementById('impact-chart');
              if (impactCtx && typeof Chart !== 'undefined') {
                  if (impactChart) {
                      impactChart.destroy();
                  }
                  
                  impactChart = new Chart(impactCtx, {
                      type: 'bar',
                      data: {
                          labels: ['Driver Terbantu', 'Zakat Disalurkan', 'Wakaf Terkumpul', 'Mustahiq Dibantu'],
                          datasets: [{
                              label: 'Impact Metrics',
                              data: [1247, 4800000, 1200000, 2847],
                              backgroundColor: ['#2ecc71', '#f1c40f', '#9b59b6', '#3498db'],
                              borderColor: ['#27ae60', '#f39c12', '#8e44ad', '#2980b9'],
                              borderWidth: 1
                          }]
                      },
                      options: {
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                              legend: {
                                  display: false
                              },
                              tooltip: {
                                  callbacks: {
                                      label: function(context) {
                                          const label = context.label;
                                          const value = context.parsed.y;
                                          
                                          if (label.includes('Zakat') || label.includes('Wakaf')) {
                                              return label + ': Rp ' + (value / 1000000).toFixed(1) + 'M';
                                          }
                                          return label + ': ' + value.toLocaleString();
                                      }
                                  }
                              }
                          },
                          scales: {
                              y: {
                                  beginAtZero: true,
                                  ticks: {
                                      callback: function(value) {
                                          if (value >= 1000000) {
                                              return 'Rp ' + (value / 1000000) + 'M';
                                          } else if (value >= 1000) {
                                              return (value / 1000) + 'K';
                                          }
                                          return value;
                                      }
                                  }
                              }
                          }
                      }
                  });
              }
          } catch (error) {
              console.error('Error in initializeCharts:', error);
          }
      }
      
      function startAnalyticsUpdates() {
          try {
              // Update real-time stats every 5 seconds
              setInterval(() => {
                  updateAnalyticsStats();
              }, 5000);
          } catch (error) {
              console.error('Error in startAnalyticsUpdates:', error);
          }
      }
      
      function updateAnalyticsStats() {
          try {
              const ordersToday = document.getElementById('orders-today');
              const activeDrivers = document.getElementById('active-drivers');
              
              if (ordersToday) {
                  const currentOrders = parseInt(ordersToday.textContent.replace(/[^\d]/g, ''));
                  const newOrders = currentOrders + Math.floor(Math.random() * 3);
                  ordersToday.textContent = newOrders.toLocaleString();
              }
              
              if (activeDrivers) {
                  const currentDrivers = parseInt(activeDrivers.textContent.replace(/[^\d]/g, ''));
                  const variation = Math.floor(Math.random() * 10) - 5;
                  const newDrivers = Math.max(1200, currentDrivers + variation);
                  activeDrivers.textContent = newDrivers.toLocaleString();
              }
          } catch (error) {
              console.error('Error in updateAnalyticsStats:', error);
          }
      }
      
      // Orders functionality
      function initializeOrdersEvents() {
          try {
              updateOrdersList();
              startOrdersUpdates();
          } catch (error) {
              console.error('Error in initializeOrdersEvents:', error);
          }
      }
      
      function updateOrdersList() {
          try {
              const ordersList = document.getElementById('orders-list');
              if (!ordersList) return;
      
              // Orders list is already populated in template
              // This function can be used to refresh the list dynamically
          } catch (error) {
              console.error('Error in updateOrdersList:', error);
          }
      }
      
      function showOrderDetail(orderId) {
          try {
              const order = ordersData[orderId];
              if (!order) {
                  showNotification('Data pesanan tidak ditemukan', 'error');
                  return;
              }
      
              const modal = document.getElementById('order-detail-modal');
              const content = document.getElementById('order-detail-content');
              
              if (!modal || !content) {
                  console.error('Order detail modal elements not found');
                  return;
              }
      
              const statusColors = {
                  pending: 'luyu-gold',
                  confirmed: 'luyu-blue',
                  pickup: 'luyu-purple',
                  ongoing: 'orange-500',
                  completed: 'luyu-green',
                  cancelled: 'luyu-red'
              };
      
              const statusTexts = {
                  pending: 'Menunggu Driver',
                  confirmed: 'Dikonfirmasi',
                  pickup: 'Penjemputan',
                  ongoing: 'Dalam Perjalanan',
                  completed: 'Selesai',
                  cancelled: 'Dibatalkan'
              };
      
              content.innerHTML = `
                  <div class="space-y-6">
                      <!-- Order Header -->
                      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                              <h3 class="text-xl font-bold text-gray-800">${order.id}</h3>
                              <span class="status-${order.status} px-3 py-1 rounded-full text-sm font-semibold">${statusTexts[order.status]}</span>
                          </div>
                          <div class="text-right">
                              <p class="text-2xl font-bold text-gray-800">Rp ${order.price.toLocaleString()}</p>
                              <p class="text-sm text-gray-500">${order.time}</p>
                          </div>
                      </div>
      
                      <!-- Route Details -->
                      <div class="space-y-4">
                          <div class="flex items-center">
                              <div class="w-4 h-4 bg-luyu-green rounded-full mr-4"></div>
                              <div>
                                  <p class="font-semibold text-gray-800">Lokasi Penjemputan</p>
                                  <p class="text-gray-600">${order.from}</p>
                              </div>
                          </div>
                          <div class="border-l-2 border-gray-300 ml-2 h-8"></div>
                          <div class="flex items-center">
                              <div class="w-4 h-4 bg-luyu-red rounded-full mr-4"></div>
                              <div>
                                  <p class="font-semibold text-gray-800">Tujuan</p>
                                  <p class="text-gray-600">${order.to}</p>
                              </div>
                          </div>
                      </div>
      
                      ${order.driver ? `
                      <!-- Driver Info -->
                      <div class="p-4 bg-luyu-green/10 rounded-lg">
                          <h4 class="font-semibold text-gray-800 mb-3">Informasi Driver</h4>
                          <div class="flex items-center">
                              <div class="w-12 h-12 bg-luyu-green/20 rounded-full flex items-center justify-center mr-4">
                                  <svg class="w-6 h-6 text-luyu-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                  </svg>
                              </div>
                              <div>
                                  <p class="font-semibold text-gray-800">${order.driver}</p>
                                  <p class="text-sm text-gray-600">${order.vehicle} • Cluster ${order.cluster}</p>
                              </div>
                          </div>
                      </div>
                      ` : ''}
      
                      <!-- Progress -->
                      <div>
                          <h4 class="font-semibold text-gray-800 mb-3">Progress Pesanan</h4>
                          <div class="progress-bar">
                              <div class="progress-fill bg-${statusColors[order.status]}" style="width: ${order.progress}%"></div>
                          </div>
                          <p class="text-sm text-gray-600 mt-2">${order.eta}</p>
                      </div>
      
                      <!-- Actions -->
                      <div class="flex space-x-3">
                          ${order.status === 'ongoing' || order.status === 'pickup' ? `
                          <button class="flex-1 bg-luyu-blue text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all" onclick="trackOrder('${order.id}')">
                              Lacak Pesanan
                          </button>
                          ` : ''}
                          ${order.status === 'pending' ? `
                          <button class="flex-1 bg-luyu-red text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all" onclick="cancelOrder('${order.id}')">
                              Batalkan Pesanan
                          </button>
                          ` : ''}
                          ${order.status === 'completed' ? `
                          <button class="flex-1 bg-luyu-green text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all" onclick="rateOrder('${order.id}')">
                              Beri Rating
                          </button>
                          ` : ''}
                          <button class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all" onclick="closeModal('order-detail-modal')">
                              Tutup
                          </button>
                      </div>
                  </div>
              `;
              
              showModal('order-detail-modal');
          } catch (error) {
              console.error('Error in showOrderDetail:', error);
              showNotification('Gagal memuat detail pesanan', 'error');
          }
      }
      
      function filterOrders(type, value) {
          try {
              console.log(`Filtering orders by ${type}: ${value}`);
              // Implement filter logic here
              showNotification(`Filter ${type}: ${value}`, 'info');
          } catch (error) {
              console.error('Error in filterOrders:', error);
          }
      }
      
      function searchOrders(query) {
          try {
              if (query.length > 2) {
                  console.log('Searching orders:', query);
                  showNotification(`Mencari pesanan: "${query}"`, 'info');
              }
          } catch (error) {
              console.error('Error in searchOrders:', error);
          }
      }
      
      function refreshOrders() {
          try {
              showLoading();
              setTimeout(() => {
                  hideLoading();
                  updateOrdersList();
                  showNotification('Data pesanan berhasil diperbarui', 'success');
              }, 1500);
          } catch (error) {
              console.error('Error in refreshOrders:', error);
              hideLoading();
              showNotification('Gagal memperbarui data pesanan', 'error');
          }
      }
      
      function trackOrder(orderId) {
          try {
              closeModal('order-detail-modal');
              showPage('maps');
              showNotification(`Melacak pesanan ${orderId}`, 'info');
          } catch (error) {
              console.error('Error in trackOrder:', error);
          }
      }
      
      function cancelOrder(orderId) {
          try {
              if (confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
                  ordersData[orderId].status = 'cancelled';
                  ordersData[orderId].progress = 0;
                  ordersData[orderId].eta = 'Dibatalkan';
                  
                  closeModal('order-detail-modal');
                  showNotification(`Pesanan ${orderId} berhasil dibatalkan`, 'success');
                  
                  if (currentPage === 'orders') {
                      updateOrdersList();
                  }
              }
          } catch (error) {
              console.error('Error in cancelOrder:', error);
              showNotification('Gagal membatalkan pesanan', 'error');
          }
      }
      
      function rateOrder(orderId) {
          try {
              closeModal('order-detail-modal');
              showNotification('Fitur rating akan segera tersedia', 'info');
          } catch (error) {
              console.error('Error in rateOrder:', error);
          }
      }
      
      function startOrdersUpdates() {
          try {
              // Update orders status every 10 seconds
              setInterval(() => {
                  updateOrdersProgress();
              }, 10000);
          } catch (error) {
              console.error('Error in startOrdersUpdates:', error);
          }
      }
      
      function updateOrdersProgress() {
          try {
              // Simulate order progress updates
              Object.keys(ordersData).forEach(orderId => {
                  const order = ordersData[orderId];
                  if (order.status === 'ongoing' || order.status === 'pickup') {
                      const progressIncrease = Math.random() * 10;
                      order.progress = Math.min(100, order.progress + progressIncrease);
                      
                      if (order.progress >= 100 && order.status === 'ongoing') {
                          order.status = 'completed';
                          order.eta = 'Selesai';
                          showNotification(`Pesanan ${orderId} telah selesai`, 'success');
                      }
                  }
              });
          } catch (error) {
              console.error('Error in updateOrdersProgress:', error);
          }
      }
      
      // Driver detail functionality
      function showDriverDetail(driverId) {
          try {
              const driver = driverData[driverId];
              if (!driver) {
                  showNotification('Data driver tidak ditemukan', 'error');
                  return;
              }
      
              const panel = document.getElementById('driver-panel');
              const content = document.getElementById('driver-detail-content');
              
              if (!panel || !content) {
                  console.error('Driver panel elements not found');
                  return;
              }
              
              const clusterColors = {
                  'A': 'luyu-blue',
                  'B': 'orange-500', 
                  'C': 'luyu-green'
              };
              
              const clusterColor = clusterColors[driver.cluster] || 'luyu-gray';
              
              content.innerHTML = `
                  <div class="space-y-6">
                      <!-- Driver Header -->
                      <div class="text-center">
                          <div class="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <svg class="w-10 h-10 text-${clusterColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                              </svg>
                          </div>
                          <h3 class="text-xl font-bold text-gray-800">${driver.name}</h3>
                          <div class="flex items-center justify-center mt-2 space-x-2">
                              <span class="bg-${clusterColor} text-white px-2 py-1 rounded-full text-xs font-bold">Cluster ${driver.cluster}</span>
                              ${driver.priority ? '<span class="bg-luyu-gold text-white px-2 py-1 rounded-full text-xs font-bold">Prioritas</span>' : ''}
                          </div>
                      </div>
      
                      <!-- Driver Stats -->
                      <div class="grid grid-cols-2 gap-4">
                          <div class="bg-gray-50 p-3 rounded-lg text-center">
                              <p class="text-2xl font-bold" style="color: #${clusterColor === 'luyu-blue' ? '3498db' : clusterColor === 'luyu-green' ? '2ecc71' : 'f39c12'}">${driver.rating || 'N/A'}</p>
                              <p class="text-xs text-gray-600">Rating</p>
                          </div>
                          <div class="bg-gray-50 p-3 rounded-lg text-center">
                              <p class="text-2xl font-bold text-gray-800">${driver.trips || 'N/A'}</p>
                              <p class="text-xs text-gray-600">Total Trip</p>
                          </div>
                      </div>
      
                      <!-- Driver Info -->
                      <div class="space-y-3">
                          <div class="flex justify-between">
                              <span class="text-gray-600">Kendaraan</span>
                              <span class="font-semibold">${driver.vehicle || 'N/A'}</span>
                          </div>
                          <div class="flex justify-between">
                              <span class="text-gray-600">Jarak</span>
                              <span class="font-semibold" style="color: #${clusterColor === 'luyu-blue' ? '3498db' : clusterColor === 'luyu-green' ? '2ecc71' : 'f39c12'}">${driver.distance || 'N/A'}</span>
                          </div>
                          <div class="flex justify-between">
                              <span class="text-gray-600">Pendapatan Harian</span>
                              <span class="font-semibold">${driver.earnings || 'N/A'}</span>
                          </div>
                          <div class="flex justify-between">
                              <span class="text-gray-600">Status</span>
                              <span class="bg-luyu-green text-white px-2 py-1 rounded-full text-xs font-semibold">
                                  ${driver.status === 'online' ? 'Online' : driver.status === 'busy' ? 'Sibuk' : 'Offline'}
                              </span>
                          </div>
                          ${driver.phone ? `
                          <div class="flex justify-between">
                              <span class="text-gray-600">Telepon</span>
                              <span class="font-semibold">${driver.phone}</span>
                          </div>
                          ` : ''}
                          ${driver.joinDate ? `
                          <div class="flex justify-between">
                              <span class="text-gray-600">Bergabung</span>
                              <span class="font-semibold">${driver.joinDate}</span>
                          </div>
                          ` : ''}
                      </div>
      
                      <!-- Bagi Hasil Info -->
                      <div class="bg-gray-50 border-l-4 border-${clusterColor} rounded-lg p-4">
                          <h4 class="font-semibold text-gray-800 mb-2">Informasi Bagi Hasil</h4>
                          <div class="text-sm text-gray-600">
                              ${driver.cluster === 'C' ? 
                                  '<p>Driver mendapat <span class="font-bold text-luyu-green">90%</span> dari total tarif</p><p class="mt-1">Platform hanya mengambil 10% untuk operasional</p>' : 
                                  driver.cluster === 'B' ? 
                                  '<p>Driver mendapat <span class="font-bold text-orange-500">80%</span> dari total tarif</p><p class="mt-1">Platform mengambil 20% untuk operasional</p>' :
                                  '<p>Driver mendapat <span class="font-bold text-luyu-blue">70%</span> dari total tarif</p><p class="mt-1">Platform mengambil 30% untuk operasional</p>'
                              }
                          </div>
                      </div>
      
                      <!-- Actions -->
                      <div class="space-y-3">
                          <button class="w-full bg-luyu-green text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all" onclick="bookDriver('${driverId}')">
                              Pesan ${driver.name}
                          </button>
                          <button class="w-full bg-luyu-gold text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all" onclick="sendInfaq('${driverId}')">
                              Kirim Infaq Langsung
                          </button>
                          ${driver.phone ? `
                          <button class="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all" onclick="callDriver('${driver.phone}')">
                              Hubungi Driver
                          </button>
                          ` : ''}
                      </div>
                  </div>
              `;
              
              panel.classList.add('active');
          } catch (error) {
              console.error('Error in showDriverDetail:', error);
              showNotification('Gagal memuat detail driver', 'error');
          }
      }
      
      function closeDriverPanel() {
          try {
              const panel = document.getElementById('driver-panel');
              if (panel) {
                  panel.classList.remove('active');
              }
          } catch (error) {
              console.error('Error in closeDriverPanel:', error);
          }
      }
      
      // Driver actions
      function bookDriver(driverId) {
          try {
              const driver = driverData[driverId];
              if (driver) {
                  closeDriverPanel();
                  showOrderModal();
                  showNotification(`Driver ${driver.name} dipilih untuk pesanan Anda`, 'success');
              }
          } catch (error) {
              console.error('Error in bookDriver:', error);
              showNotification('Gagal memesan driver', 'error');
          }
      }
      
      function sendInfaq(driverId) {
          try {
              const driver = driverData[driverId];
              if (driver) {
                  closeDriverPanel();
                  showNotification(`Infaq Rp 5.000 berhasil dikirim ke ${driver.name}`, 'success');
                  userData.infaqBalance += 5000;
              }
          } catch (error) {
              console.error('Error in sendInfaq:', error);
              showNotification('Gagal mengirim infaq', 'error');
          }
      }
      
      function callDriver(phone) {
          try {
              showNotification(`Menghubungkan ke ${phone}...`, 'info');
              setTimeout(() => {
                  showNotification('Panggilan dimulai', 'success');
              }, 2000);
          } catch (error) {
              console.error('Error in callDriver:', error);
              showNotification('Gagal menghubungi driver', 'error');
          }
      }
      
      // Map functionality
      function initializeMapEvents() {
          try {
              document.querySelectorAll('.driver-marker').forEach(marker => {
                  marker.addEventListener('mouseenter', function(e) {
                      showTooltip(e, this.getAttribute('data-driver'));
                  });
                  
                  marker.addEventListener('mouseleave', function() {
                      hideTooltip();
                  });
              });
      
              startLiveActivityUpdates();
          } catch (error) {
              console.error('Error in initializeMapEvents:', error);
          }
      }
      
      function showTooltip(event, driverId) {
          try {
              const driver = driverData[driverId];
              if (!driver) return;
              
              const tooltip = document.getElementById('tooltip');
              if (tooltip) {
                  tooltip.innerHTML = `<strong>${driver.name}</strong><br>${driver.vehicle} • ⭐ ${driver.rating}`;
                  tooltip.style.left = event.pageX + 10 + 'px';
                  tooltip.style.top = event.pageY - 30 + 'px';
                  tooltip.classList.add('show');
              }
          } catch (error) {
              console.error('Error in showTooltip:', error);
          }
      }
      
      function hideTooltip() {
          try {
              const tooltip = document.getElementById('tooltip');
              if (tooltip) {
                  tooltip.classList.remove('show');
              }
          } catch (error) {
              console.error('Error in hideTooltip:', error);
          }
      }
      
      function selectCluster(cluster) {
          try {
              const clusterNames = { a: 'Jakarta', b: 'Bandung', c: 'Banten' };
              const clusterColors = { a: '#3498db', b: '#f39c12', c: '#2ecc71' };
              const clusterRatios = { a: '70:30', b: '80:20', c: '90:10' };
              
              const info = document.getElementById('cluster-info');
              const content = document.getElementById('cluster-info-content');
              
              if (info && content) {
                  content.innerHTML = `
                      <h4 class="font-bold text-gray-800 mb-3">Cluster ${cluster.toUpperCase()} - ${clusterNames[cluster]}</h4>
                      <div class="space-y-2 text-sm">
                          <div class="flex justify-between">
                              <span>Bagi Hasil:</span>
                              <span class="font-bold" style="color: ${clusterColors[cluster]}">${clusterRatios[cluster]}</span>
                          </div>
                          <div class="flex justify-between">
                              <span>Driver Online:</span>
                              <span class="font-bold">${cluster === 'a' ? '342' : cluster === 'b' ? '198' : '707'}</span>
                          </div>
                          <div class="flex justify-between">
                              <span>Rata-rata Pendapatan:</span>
                              <span class="font-bold">${cluster === 'a' ? 'Rp 285K' : cluster === 'b' ? 'Rp 195K' : 'Rp 125K'}</span>
                          </div>
                      </div>
                      <button class="mt-3 w-full text-white py-2 rounded-lg text-sm font-semibold" style="background-color: ${clusterColors[cluster]}" onclick="focusCluster('${cluster}')">
                          Focus ke Cluster ${cluster.toUpperCase()}
                      </button>
                  `;
                  
                  info.classList.remove('hidden');
                  
                  setTimeout(() => {
                      info.classList.add('hidden');
                  }, 5000);
              }
          } catch (error) {
              console.error('Error in selectCluster:', error);
          }
      }
      
      function focusCluster(cluster) {
          try {
              if (cluster === '') {
                  showNotification('Menampilkan semua cluster', 'info');
                  return;
              }
              
              const clusterNames = { a: 'Jakarta', b: 'Bandung', c: 'Banten' };
              showNotification(`Focus ke Cluster ${cluster.toUpperCase()} - ${clusterNames[cluster]}`, 'info');
              
              console.log(`Focusing on cluster ${cluster}`);
          } catch (error) {
              console.error('Error in focusCluster:', error);
          }
      }
      
      function toggleDriverVisibility(type) {
          try {
              console.log(`Toggling ${type} drivers visibility`);
              showNotification(`${type === 'online' ? 'Driver Online' : type === 'offline' ? 'Driver Offline' : 'Driver Prioritas Syariah'} visibility toggled`, 'info');
          } catch (error) {
              console.error('Error in toggleDriverVisibility:', error);
          }
      }
      
      function updateSearchRadius(value) {
          try {
              const radiusElement = document.getElementById('radius-value');
              if (radiusElement) {
                  radiusElement.textContent = `${value} km`;
              }
              console.log(`Search radius updated to ${value} km`);
          } catch (error) {
              console.error('Error in updateSearchRadius:', error);
          }
      }
      
      function refreshMap() {
          try {
              showLoading();
              setTimeout(() => {
                  hideLoading();
                  showNotification('Peta berhasil diperbarui', 'success');
                  updateLiveActivity();
              }, 1500);
          } catch (error) {
              console.error('Error in refreshMap:', error);
              hideLoading();
              showNotification('Gagal memperbarui peta', 'error');
          }
      }
      
      function zoomIn() {
          console.log('Zooming in...');
          showNotification('Zoom in', 'info');
      }
      
      function zoomOut() {
          console.log('Zooming out...');
          showNotification('Zoom out', 'info');
      }
      
      function centerMap() {
          console.log('Centering map...');
          showNotification('Peta dikembalikan ke pusat', 'info');
      }
      
      function startLiveActivityUpdates() {
          try {
              const activities = [
                  { driver: 'Ustadzah Siti', action: 'Menuju pickup', color: 'luyu-green' },
                  { driver: 'Pak Ahmad', action: 'Dalam perjalanan', color: 'luyu-blue' },
                  { driver: 'Bu Fatimah', action: 'Selesai trip', color: 'luyu-gold' },
                  { driver: 'Ustadz Hasan', action: 'Menunggu pesanan', color: 'luyu-purple' },
                  { driver: 'Pak Budi', action: 'Pickup passenger', color: 'luyu-red' }
              ];
      
              let currentIndex = 0;
              
              setInterval(() => {
                  updateLiveActivity(activities[currentIndex]);
                  currentIndex = (currentIndex + 1) % activities.length;
              }, 3000);
          } catch (error) {
              console.error('Error in startLiveActivityUpdates:', error);
          }
      }
      
      function updateLiveActivity(activity = null) {
          try {
              const container = document.getElementById('live-activity');
              if (!container) return;
      
              if (activity) {
                  const newActivity = document.createElement('div');
                  newActivity.className = 'flex items-center notification-enter';
                  newActivity.innerHTML = `
                      <div class="w-2 h-2 bg-${activity.color} rounded-full mr-2 animate-pulse"></div>
                      <span>${activity.driver} - ${activity.action}</span>
                  `;
                  
                  container.insertBefore(newActivity, container.firstChild);
                  
                  if (container.children.length > 3) {
                      container.removeChild(container.lastChild);
                  }
              }
          } catch (error) {
              console.error('Error in updateLiveActivity:', error);
          }
      }
      
      function initializeWalletEvents() {
      try {
          // Listen for topup amount changes
          const topupInput = document.getElementById('topup-amount');
          if (topupInput) {
              topupInput.addEventListener('input', function() {
                  const amount = parseInt(this.value) || 0;
                  updateZakatAmount(amount);
              });
          }
      
          // Initialize switch states from saved preferences
          loadWalletSettings();
          
          // Initialize switch events
          initializeSwitchEvents();
          
          // Check balance alert on page load
          setTimeout(() => checkBalanceAlert(), 1000);
      } catch (error) {
          console.error('Error in initializeWalletEvents:', error);
      }
      }
      
      function loadWalletSettings() {
      try {
          if (userData.settings) {
              const autoZakatSwitch = document.getElementById('auto-zakat-wallet');
              const autoInfaqSwitch = document.getElementById('auto-infaq-wallet');
              const balanceNotificationSwitch = document.getElementById('balance-notification-wallet');
              
              if (autoZakatSwitch) {
                  autoZakatSwitch.checked = userData.settings.autoZakat !== false; // Default true
              }
              
              if (autoInfaqSwitch) {
                  autoInfaqSwitch.checked = userData.settings.autoInfaq !== false; // Default true
              }
              
              if (balanceNotificationSwitch) {
                  balanceNotificationSwitch.checked = userData.settings.balanceNotification !== false; // Default true
              }
          }
      } catch (error) {
          console.error('Error in loadWalletSettings:', error);
      }
      }
      
      // Wallet settings functions
      function toggleAutoZakat(isEnabled) {
      try {
          userData.settings = userData.settings || {};
          userData.settings.autoZakat = isEnabled;
          
          if (isEnabled) {
              showNotification('Auto-zakat diaktifkan - 2.5% akan dipotong otomatis', 'success');
          } else {
              showNotification('Auto-zakat dinonaktifkan', 'warning');
          }
          
          saveUserPreferences();
      } catch (error) {
          console.error('Error in toggleAutoZakat:', error);
          showNotification('Gagal mengubah pengaturan auto-zakat', 'error');
      }
      }
      
      function toggleAutoInfaq(isEnabled) {
      try {
          userData.settings = userData.settings || {};
          userData.settings.autoInfaq = isEnabled;
          
          if (isEnabled) {
              showNotification('Auto-infaq diaktifkan - Rp 1.000 per trip Cluster C', 'success');
          } else {
              showNotification('Auto-infaq dinonaktifkan', 'warning');
          }
          
          saveUserPreferences();
      } catch (error) {
          console.error('Error in toggleAutoInfaq:', error);
          showNotification('Gagal mengubah pengaturan auto-infaq', 'error');
      }
      }
      
      function toggleBalanceNotification(isEnabled) {
      try {
          userData.settings = userData.settings || {};
          userData.settings.balanceNotification = isEnabled;
          
          if (isEnabled) {
              showNotification('Notifikasi saldo diaktifkan - Alert saat saldo < Rp 50.000', 'success');
              checkBalanceAlert(); // Check immediately
          } else {
              showNotification('Notifikasi saldo dinonaktifkan', 'warning');
          }
          
          saveUserPreferences();
      } catch (error) {
          console.error('Error in toggleBalanceNotification:', error);
          showNotification('Gagal mengubah pengaturan notifikasi', 'error');
      }
      }
      
      function checkBalanceAlert() {
      try {
          if (userData.settings?.balanceNotification && userData.balance < 50000) {
              showNotification(`Saldo Anda rendah: Rp ${userData.balance.toLocaleString()}. Silakan top up.`, 'warning');
          }
      } catch (error) {
          console.error('Error in checkBalanceAlert:', error);
      }
      }
      
      function initializeSwitchEvents() {
          try {
              document.querySelectorAll('.switch input[type="checkbox"]').forEach(switchElement => {
                  switchElement.addEventListener('change', function() {
                      const parentSwitch = this.closest('.switch');
                      const isChecked = this.checked;
                      
                      if (parentSwitch) {
                          const slider = parentSwitch.querySelector('.slider');
                          if (slider) {
                              if (isChecked) {
                                  slider.style.boxShadow = '0 0 10px rgba(46, 204, 113, 0.5)';
                              } else {
                                  slider.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.1)';
                              }
                          }
                      }
                      
                      console.log('Switch toggled:', isChecked);
                  });
              });
          } catch (error) {
              console.error('Error in initializeSwitchEvents:', error);
          }
      }
      
      // Modal management
      function showModal(modalId) {
          try {
              const modal = document.getElementById(modalId);
              if (modal) {
                  modal.classList.remove('hidden');
                  modal.classList.add('flex');
                  document.body.style.overflow = 'hidden';
              }
          } catch (error) {
              console.error('Error in showModal:', error);
          }
      }
      
      function closeModal(modalId) {
          try {
              const modal = document.getElementById(modalId);
              if (modal) {
                  modal.classList.add('hidden');
                  modal.classList.remove('flex');
                  document.body.style.overflow = 'auto';
              }
          } catch (error) {
              console.error('Error in closeModal:', error);
          }
      }
      
      function showOrderModal() {
          showModal('order-modal');
      }
      
      function showNotifications() {
          try {
              const notifications = [
                  'Pesanan baru dari Cluster C tersedia',
                  'Saldo Anda mencukupi untuk 8 trip lagi',
                  'Ustadzah Siti memberikan rating 5 bintang',
                  'Auto-zakat berhasil disalurkan Rp 2.500',
                  'Pahala points Anda bertambah +15'
              ];
              
              notifications.forEach((notif, index) => {
                  setTimeout(() => {
                      showNotification(notif, 'info');
                  }, index * 1000);
              });
          } catch (error) {
              console.error('Error in showNotifications:', error);
          }
      }
      
      function showUserMenu() {
          try {
              const menuOptions = [
                  'Edit Profile',
                  'Pengaturan Akun',
                  'Riwayat Aktivitas',
                  'Bantuan & Support',
                  'Logout'
              ];
              
              showNotification('Menu pengguna: ' + menuOptions.join(', '), 'info');
          } catch (error) {
              console.error('Error in showUserMenu:', error);
          }
      }
      
      // Notification system
      function showNotification(message, type = 'success') {
          try {
              const container = document.getElementById('notification-container');
              if (!container) return;
      
              const notification = document.createElement('div');
              
              const colors = {
                  success: 'bg-luyu-green',
                  error: 'bg-luyu-red',
                  warning: 'bg-luyu-gold',
                  info: 'bg-luyu-blue'
              };
              
              const icons = {
                  success: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
                  error: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
                  warning: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"/>`,
                  info: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`
              };
              
              notification.className = `notification-enter ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center max-w-sm`;
              notification.innerHTML = `
                  <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      ${icons[type]}
                  </svg>
                  <span class="flex-1">${message}</span>
                  <button onclick="this.parentElement.remove()" class="ml-4 hover:bg-white/20 rounded p-1 flex-shrink-0">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                  </button>
              `;
              
              container.appendChild(notification);
              
              setTimeout(() => {
                  if (notification.parentElement) {
                      notification.style.opacity = '0';
                      notification.style.transform = 'translateX(100%)';
                      setTimeout(() => {
                          if (notification.parentElement) {
                              notification.remove();
                          }
                      }, 300);
                  }
              }, 5000);
          } catch (error) {
              console.error('Error in showNotification:', error);
          }
      }
      
      // Loading overlay
      function showLoading() {
          try {
              const overlay = document.getElementById('loading-overlay');
              if (overlay) {
                  overlay.classList.remove('hidden');
                  overlay.classList.add('flex');
              }
          } catch (error) {
              console.error('Error in showLoading:', error);
          }
      }
      
      function hideLoading() {
          try {
              const overlay = document.getElementById('loading-overlay');
              if (overlay) {
                  overlay.classList.add('hidden');
                  overlay.classList.remove('flex');
              }
          } catch (error) {
              console.error('Error in hideLoading:', error);
          }
      }
      
      // Search functionality
      function handleSearch(query) {
          try {
              if (query.length > 2) {
                  console.log('Searching for:', query);
                  
                  const searchResults = [
                      'Ustadzah Siti (Driver Cluster C)',
                      'Rute ke Masjid Al-Barokah',
                      'Driver terdekat di Banten',
                      'Cluster C - Prioritas Syariah'
                  ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
                  
                  if (searchResults.length > 0) {
                      showNotification(`Ditemukan ${searchResults.length} hasil untuk "${query}"`, 'info');
                  } else {
                      showNotification(`Tidak ada hasil untuk "${query}"`, 'warning');
                  }
              }
          } catch (error) {
              console.error('Error in handleSearch:', error);
          }
      }
      
      // Order processing
      function processOrder() {
          try {
              const fromInput = document.querySelector('input[placeholder="Lokasi penjemputan..."]');
              const toInput = document.querySelector('input[placeholder="Tujuan..."]');
              
              const fromLocation = fromInput ? fromInput.value : '';
              const toLocation = toInput ? toInput.value : '';
              
              if (!fromLocation || !toLocation) {
                  showNotification('Mohon lengkapi lokasi penjemputan dan tujuan', 'error');
                  return;
              }
              
              showLoading();
              
              setTimeout(() => {
                  hideLoading();
                  closeModal('order-modal');
                  
                  if (fromInput) fromInput.value = '';
                  if (toInput) toInput.value = '';
                  
                  showNotification('Pesanan berhasil dibuat! Driver sedang menuju lokasi Anda.', 'success');
                  
                  userData.totalTrips++;
                  
                  setTimeout(() => {
                      showNotification('Driver telah mengkonfirmasi pesanan Anda', 'info');
                  }, 3000);
                  
                  setTimeout(() => {
                      showNotification('Driver sedang dalam perjalanan ke lokasi pickup', 'info');
                  }, 8000);
              }, 2000);
          } catch (error) {
              console.error('Error in processOrder:', error);
              hideLoading();
              showNotification('Terjadi kesalahan saat memproses pesanan', 'error');
          }
      }
      
      // Top up functionality
      function setTopupAmount(amount) {
          try {
              const input = document.getElementById('topup-amount');
              if (input) {
                  input.value = amount;
                  updateZakatAmount(amount);
              }
          } catch (error) {
              console.error('Error in setTopupAmount:', error);
          }
      }
      
      function updateZakatAmount(amount) {
          try {
              const zakatAmount = Math.floor(amount * 0.025);
              const zakatElement = document.getElementById('zakat-amount');
              if (zakatElement) {
                  zakatElement.textContent = `Rp ${zakatAmount.toLocaleString()}`;
              }
          } catch (error) {
              console.error('Error in updateZakatAmount:', error);
          }
      }
      
      function processTopup() {
          try {
              const amountInput = document.getElementById('topup-amount');
              const autoZakatInput = document.getElementById('auto-zakat');
              
              const amount = amountInput ? parseInt(amountInput.value) : 0;
              const autoZakat = autoZakatInput ? autoZakatInput.checked : false;
              
              if (!amount || amount < 10000) {
                  showNotification('Minimum top up adalah Rp 10.000', 'error');
                  return;
              }
              
              if (amount > 10000000) {
                  showNotification('Maximum top up adalah Rp 10.000.000', 'error');
                  return;
              }
              
              showLoading();
              
              setTimeout(() => {
                  hideLoading();
                  closeModal('topup-modal');
                  
                  userData.balance += amount;
                  if (autoZakat) {
                      const zakatAmount = Math.floor(amount * 0.025);
                      userData.balance -= zakatAmount;
                      showNotification(`Berhasil top up Rp ${amount.toLocaleString()}. Zakat Rp ${zakatAmount.toLocaleString()} telah disalurkan.`, 'success');
                  } else {
                      showNotification(`Berhasil top up Rp ${amount.toLocaleString()}`, 'success');
                  }
                  
                  if (amountInput) amountInput.value = '';
                  updateZakatAmount(0);
                  
                  if (currentPage === 'wallet') {
                      setTimeout(() => {
                          loadPageContent('wallet');
                      }, 1000);
                  }
              }, 2000);
          } catch (error) {
              console.error('Error in processTopup:', error);
              hideLoading();
              showNotification('Terjadi kesalahan saat memproses top up', 'error');
          }
      }
      
      // Data simulation and real-time updates
      function startDataSimulation() {
          try {
              setInterval(() => {
                  const driverCountElement = document.getElementById('driver-count');
                  if (driverCountElement) {
                      const variation = Math.floor(Math.random() * 20) - 10;
                      const newCount = 1247 + variation;
                      driverCountElement.textContent = newCount.toLocaleString();
                  }
              }, 30000);
      
              setInterval(() => {
                  userData.pahalaPoints += Math.floor(Math.random() * 5) + 1;
                  const pahalaElement = document.getElementById('pahala-count');
                  if (pahalaElement) {
                      pahalaElement.textContent = userData.pahalaPoints.toLocaleString();
                  }
              }, 60000);
      
              setInterval(() => {
                  if (Math.random() < 0.3) {
                      showNotification('Pesanan baru tersedia di sekitar Anda!', 'info');
                  }
              }, 45000);
          } catch (error) {
              console.error('Error in startDataSimulation:', error);
          }
      }
      
      // Keyboard shortcuts
      function setupKeyboardShortcuts() {
          try {
              document.addEventListener('keydown', function(e) {
                  if (e.key === 'Escape') {
                      document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
                          closeModal(modal.id);
                      });
                      closeDriverPanel();
                  }
                  
                  if (e.ctrlKey && e.key === 'o') {
                      e.preventDefault();
                      showOrderModal();
                  }
                  
                  if (e.ctrlKey && e.key === 't') {
                      e.preventDefault();
                      showModal('topup-modal');
                  }
                  
                  if (e.key >= '1' && e.key <= '9') {
                      const pages = ['dashboard', 'maps', 'orders', 'wallet', 'analytics', 'zakat', 'wakaf', 'kajian', 'settings'];
                      const pageIndex = parseInt(e.key) - 1;
                      if (pages[pageIndex]) {
                          showPage(pages[pageIndex]);
                      }
                  }
              });
          } catch (error) {
              console.error('Error in setupKeyboardShortcuts:', error);
          }
      }
      
      // Accessibility improvements
      function setupAccessibility() {
          try {
              document.addEventListener('keydown', function(e) {
                  if (e.key === 'Tab') {
                      document.body.classList.add('keyboard-navigation');
                  }
              });
      
              document.addEventListener('mousedown', function() {
                  document.body.classList.remove('keyboard-navigation');
              });
      
              document.querySelectorAll('button').forEach(button => {
                  if (!button.getAttribute('aria-label') && button.textContent.trim()) {
                      button.setAttribute('aria-label', button.textContent.trim());
                  }
              });
          } catch (error) {
              console.error('Error in setupAccessibility:', error);
          }
      }
      
      // Performance optimization
      function optimizePerformance() {
          try {
              if ('IntersectionObserver' in window) {
                  const imageObserver = new IntersectionObserver((entries, observer) => {
                      entries.forEach(entry => {
                          if (entry.isIntersecting) {
                              const img = entry.target;
                              if (img.dataset.src) {
                                  img.src = img.dataset.src;
                                  img.classList.remove('lazy');
                                  observer.unobserve(img);
                              }
                          }
                      });
                  });
      
                  document.querySelectorAll('img[data-src]').forEach(img => {
                      imageObserver.observe(img);
                  });
              }
      
              let searchTimeout;
              const searchInput = document.querySelector('input[placeholder="Cari driver, rute..."]');
              if (searchInput) {
                  searchInput.addEventListener('input', function() {
                      clearTimeout(searchTimeout);
                      searchTimeout = setTimeout(() => {
                          handleSearch(this.value);
                      }, 300);
                  });
              }
          } catch (error) {
              console.error('Error in optimizePerformance:', error);
          }
      }
      
      // Local storage management
      function saveUserPreferences() {
          try {
              const preferences = {
                  currentPage: currentPage,
                  lastLogin: new Date().toISOString(),
                  userData: userData
              };
              localStorage.setItem('luyu_preferences', JSON.stringify(preferences));
          } catch (error) {
              console.error('Error in saveUserPreferences:', error);
          }
      }
      
      function loadUserPreferences() {
          try {
              const preferences = localStorage.getItem('luyu_preferences');
              if (preferences) {
                  const prefs = JSON.parse(preferences);
                  
                  if (prefs.userData) {
                      userData = { ...userData, ...prefs.userData };
                  }
                  
                  if (prefs.lastLogin) {
                      const lastLogin = new Date(prefs.lastLogin);
                      const now = new Date();
                      const daysDiff = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));
                      
                      if (daysDiff > 0) {
                          setTimeout(() => {
                              showNotification(`Selamat datang kembali! Terakhir login ${daysDiff} hari yang lalu`, 'info');
                          }, 2000);
                      }
                  }
              }
          } catch (error) {
              console.error('Error in loadUserPreferences:', error);
          }
      }
      
      // Error handling
      function setupErrorHandling() {
          try {
              window.addEventListener('error', function(e) {
                  console.error('Application error:', e.error);
                  showNotification('Terjadi kesalahan sistem. Tim teknis akan segera memperbaiki.', 'error');
              });
      
              window.addEventListener('unhandledrejection', function(e) {
                  console.error('Unhandled promise rejection:', e.reason);
                  showNotification('Koneksi bermasalah. Silakan coba lagi.', 'warning');
              });
          } catch (error) {
              console.error('Error in setupErrorHandling:', error);
          }
      }
      
      // Initialize app
      document.addEventListener('DOMContentLoaded', function() {
          try {
              console.log('LUYU Enhanced Application with Analytics & Orders Loaded Successfully');
              
              loadUserPreferences();
              
              showPage('dashboard');
              setupKeyboardShortcuts();
              setupAccessibility();
              optimizePerformance();
              setupErrorHandling();
              
              document.querySelectorAll('.modal').forEach(modal => {
                  modal.addEventListener('click', function(e) {
                      if (e.target === this) {
                          closeModal(this.id);
                      }
                  });
              });
              
              initializeSwitchEvents();
              startDataSimulation();
              
              setTimeout(() => {
                  showNotification('Selamat datang di LUYU Platform! 🌟', 'success');
              }, 1000);
              
              window.addEventListener('beforeunload', saveUserPreferences);
              setInterval(saveUserPreferences, 5 * 60 * 1000);
          } catch (error) {
              console.error('Error during app initialization:', error);
              showNotification('Terjadi kesalahan saat memuat aplikasi', 'error');
          }
      });
      
      // Zakat & Infaq functionality
      function updateZakatCalculation() {
      try {
      const type = document.getElementById('zakat-type').value;
      const amount = parseInt(document.getElementById('zakat-amount').value) || 0;
      let zakatAmount = 0;
      
      switch(type) {
      case 'mal':
      case 'penghasilan':
      case 'perdagangan':
          zakatAmount = amount * 0.025; // 2.5%
          break;
      case 'emas':
          zakatAmount = amount * 0.025;
          break;
      default:
          zakatAmount = amount * 0.025;
      }
      
      const resultElement = document.getElementById('zakat-result');
      if (resultElement) {
      resultElement.textContent = `Rp ${zakatAmount.toLocaleString()}`;
      }
      
      } catch (error) {
      console.error('Error in updateZakatCalculation:', error);
      }
      }
      
      function payZakat() {
      try {
      const amount = parseInt(document.getElementById('zakat-amount').value) || 0;
      const zakatAmount = amount * 0.025;
      
      if (zakatAmount < 1000) {
      showNotification('Minimum pembayaran zakat adalah Rp 1.000', 'error');
      return;
      }
      
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      showNotification(`Zakat sebesar Rp ${zakatAmount.toLocaleString()} berhasil dibayar dan disalurkan`, 'success');
      
      // Update monthly zakat
      const monthlyZakat = document.getElementById('monthly-zakat');
      if (monthlyZakat) {
          const current = parseInt(monthlyZakat.textContent.replace(/[^\d]/g, ''));
          monthlyZakat.textContent = `Rp ${(current + zakatAmount).toLocaleString()}`;
      }
      
      // Clear form
      document.getElementById('zakat-amount').value = '';
      updateZakatCalculation();
      
      }, 2000);
      
      } catch (error) {
      console.error('Error in payZakat:', error);
      hideLoading();
      showNotification('Terjadi kesalahan saat memproses pembayaran zakat', 'error');
      }
      }
      
      function processManualZakat() {
      try {
      const type = document.getElementById('manual-zakat-type').value;
      const amount = parseInt(document.getElementById('manual-zakat-amount').value) || 0;
      
      if (amount < 1000) {
      showNotification('Minimum pembayaran zakat adalah Rp 1.000', 'error');
      return;
      }
      
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      closeModal('zakat-manual-modal');
      showNotification(`Zakat ${type} sebesar Rp ${amount.toLocaleString()} berhasil dibayar`, 'success');
      
      // Clear form
      document.getElementById('manual-zakat-amount').value = '';
      
      }, 2000);
      
      } catch (error) {
      console.error('Error in processManualZakat:', error);
      hideLoading();
      showNotification('Terjadi kesalahan saat memproses zakat manual', 'error');
      }
      }
      
      function selectDriverForInfaq(driverId) {
      try {
      const modal = document.getElementById('infaq-modal');
      const recipientDiv = document.getElementById('infaq-recipient');
      
      let driverInfo = '';
      
      if (driverId === 'random') {
      driverInfo = `
          <div class="flex items-center">
              <div class="w-12 h-12 bg-luyu-blue/10 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-6 h-6 text-luyu-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
              </div>
              <div>
                  <h4 class="font-semibold">Driver Random</h4>
                  <p class="text-sm text-gray-600">Sistem akan memilih driver yang membutuhkan</p>
              </div>
          </div>
      `;
      } else {
      const driver = driverData[driverId];
      if (driver) {
          driverInfo = `
              <div class="flex items-center">
                  <div class="w-12 h-12 bg-luyu-green/10 rounded-full flex items-center justify-center mr-3">
                      <svg class="w-6 h-6 text-luyu-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                  </div>
                  <div>
                      <h4 class="font-semibold">${driver.name}</h4>
                      <p class="text-sm text-gray-600">Cluster ${driver.cluster} • ${driver.vehicle}</p>
                  </div>
              </div>
          `;
      }
      }
      
      if (recipientDiv) {
      recipientDiv.innerHTML = driverInfo;
      }
      
      showModal('infaq-modal');
      
      } catch (error) {
      console.error('Error in selectDriverForInfaq:', error);
      }
      }
      
      function setInfaqAmount(amount) {
      try {
      const input = document.getElementById('infaq-amount');
      if (input) {
      input.value = amount;
      }
      } catch (error) {
      console.error('Error in setInfaqAmount:', error);
      }
      }
      
      function processInfaq() {
      try {
      const amount = parseInt(document.getElementById('infaq-amount').value) || 0;
      const message = document.getElementById('infaq-message').value;
      
      if (amount < 1000) {
      showNotification('Minimum infaq adalah Rp 1.000', 'error');
      return;
      }
      
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      closeModal('infaq-modal');
      showNotification(`Infaq sebesar Rp ${amount.toLocaleString()} berhasil dikirim`, 'success');
      
      // Clear form
      document.getElementById('infaq-amount').value = '';
      document.getElementById('infaq-message').value = '';
      
      }, 2000);
      
      } catch (error) {
      console.error('Error in processInfaq:', error);
      hideLoading();
      showNotification('Terjadi kesalahan saat memproses infaq', 'error');
      }
      }
      
      function quickInfaq(amount) {
      try {
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      showNotification(`Infaq cepat Rp ${amount.toLocaleString()} berhasil dikirim ke driver random`, 'success');
      }, 1500);
      
      } catch (error) {
      console.error('Error in quickInfaq:', error);
      hideLoading();
      showNotification('Terjadi kesalahan saat memproses infaq cepat', 'error');
      }
      }
      
      function randomInfaq() {
      try {
      const amounts = [5000, 10000, 15000, 25000];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      showNotification(`Infaq random Rp ${randomAmount.toLocaleString()} berhasil dikirim`, 'success');
      }, 1500);
      
      } catch (error) {
      console.error('Error in randomInfaq:', error);
      hideLoading();
      showNotification('Terjadi kesalahan saat memproses infaq random', 'error');
      }
      }
      
      // Wakaf Digital functionality
      const wakafPrograms = {
      'masjid-al-ikhlas': {
      name: 'Masjid Al-Ikhlas',
      location: 'Tangerang Selatan',
      category: 'Masjid',
      target: 1200000000,
      collected: 847000000,
      description: 'Pembangunan masjid untuk 500 jamaah dengan fasilitas lengkap',
      benefits: ['Tempat ibadah 500 jamaah', 'Madrasah untuk 100 santri', 'Perpustakaan Islam'],
      userContribution: 250000
      },
      'sekolah-tahfidz': {
      name: 'Sekolah Tahfidz',
      location: 'Bekasi',
      category: 'Pendidikan',
      target: 800000000,
      collected: 320000000,
      description: 'Sekolah tahfidz untuk anak-anak kurang mampu',
      benefits: ['Pendidikan gratis 200 santri', 'Asrama dan makan', 'Beasiswa penuh'],
      userContribution: 150000
      },
      'sumur-wakaf': {
      name: 'Sumur Wakaf',
      location: 'Lombok Timur',
      category: 'Sosial',
      target: 150000000,
      collected: 125000000,
      description: 'Sumur bor untuk masyarakat yang kesulitan air bersih',
      benefits: ['Air bersih 500 keluarga', 'Kebersihan lingkungan', 'Kesehatan masyarakat'],
      userContribution: 100000
      },
      'ambulance-gratis': {
      name: 'Ambulance Gratis',
      location: 'Jakarta Selatan',
      category: 'Kesehatan',
      target: 500000000,
      collected: 180000000,
      description: 'Layanan ambulance gratis untuk masyarakat kurang mampu',
      benefits: ['Layanan 24 jam', 'Gratis untuk dhuafa', 'Peralatan medis lengkap'],
      userContribution: 75000
      }
      };
      
      function setWakafAmount(amount) {
      try {
      const input = document.getElementById('wakaf-amount');
      if (input) {
      input.value = amount;
      }
      } catch (error) {
      console.error('Error in setWakafAmount:', error);
      }
      }
      
      function processWakafTunai() {
      try {
      const type = document.getElementById('wakaf-type').value;
      const amount = parseInt(document.getElementById('wakaf-amount').value) || 0;
      const recurring = document.getElementById('wakaf-recurring').checked;
      const intention = document.getElementById('wakaf-intention').value;
      
      if (amount < 10000) {
      showNotification('Minimum wakaf adalah Rp 10.000', 'error');
      return;
      }
      
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      closeModal('wakaf-tunai-modal');
      
      const recurringText = recurring ? ' (Bulanan)' : '';
      showNotification(`Wakaf tunai Rp ${amount.toLocaleString()}${recurringText} berhasil dibayar`, 'success');
      
      // Update total wakaf
      const totalWakafElement = document.getElementById('total-wakaf');
      if (totalWakafElement) {
          const currentTotal = parseInt(totalWakafElement.textContent.replace(/[^\d]/g, ''));
          totalWakafElement.textContent = `Rp ${(currentTotal + amount).toLocaleString()}`;
      }
      
      // Clear form
      document.getElementById('wakaf-amount').value = '';
      document.getElementById('wakaf-intention').value = '';
      document.getElementById('wakaf-recurring').checked = false;
      
      // Generate certificate
      setTimeout(() => {
          showNotification('Sertifikat wakaf telah diterbitkan dan dapat diunduh', 'info');
      }, 3000);
      
      }, 2500);
      
      } catch (error) {
      console.error('Error in processWakafTunai:', error);
      hideLoading();
      showNotification('Terjadi kesalahan saat memproses wakaf', 'error');
      }
      }
      
      function contributeWakaf(programId) {
      try {
      const program = wakafPrograms[programId];
      if (!program) {
      showNotification('Program wakaf tidak ditemukan', 'error');
      return;
      }
      
      const modal = document.getElementById('wakaf-program-modal');
      const content = document.getElementById('wakaf-program-content');
      
      const remainingAmount = program.target - program.collected;
      const progressPercentage = ((program.collected / program.target) * 100).toFixed(1);
      
      content.innerHTML = `
      <div class="space-y-6">
          <!-- Program Info -->
          <div class="p-4 bg-gray-50 rounded-lg">
              <h3 class="text-xl font-bold text-gray-800 mb-2">${program.name}</h3>
              <p class="text-gray-600 mb-3">${program.description}</p>
              <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                      <span class="text-gray-500">Lokasi:</span>
                      <span class="font-semibold ml-2">${program.location}</span>
                  </div>
                  <div>
                      <span class="text-gray-500">Kategori:</span>
                      <span class="font-semibold ml-2">${program.category}</span>
                  </div>
              </div>
          </div>
      
          <!-- Progress -->
          <div>
              <div class="flex justify-between text-sm mb-2">
                  <span>Progress Terkumpul</span>
                  <span class="font-semibold">Rp ${(program.collected / 1000000).toFixed(0)}M / Rp ${(program.target / 1000000).toFixed(0)}M</span>
              </div>
              <div class="progress-bar mb-2">
                  <div class="progress-fill bg-luyu-purple" style="width: ${progressPercentage}%"></div>
              </div>
              <p class="text-xs text-gray-500">${progressPercentage}% tercapai • Sisa Rp ${(remainingAmount / 1000000).toFixed(1)}M lagi</p>
          </div>
      
          <!-- Benefits -->
          <div>
              <h4 class="font-semibold text-gray-800 mb-3">Manfaat Program</h4>
              <ul class="space-y-2">
                  ${program.benefits.map(benefit => `
                      <li class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-luyu-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          ${benefit}
                      </li>
                  `).join('')}
              </ul>
          </div>
      
          <!-- Contribution Form -->
          <div class="border-t pt-6">
              <h4 class="font-semibold text-gray-800 mb-4">Kontribusi Anda</h4>
              <div class="space-y-4">
                  <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Jumlah Kontribusi</label>
                      <input type="number" placeholder="Masukkan jumlah..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luyu-purple focus:border-transparent" id="program-contribution-amount">
                  </div>
      
                  <div class="grid grid-cols-4 gap-3">
                      <button class="py-2 px-3 border border-gray-300 rounded-lg hover:border-luyu-purple hover:text-luyu-purple transition-all text-sm" onclick="setProgramContribution(50000)">50K</button>
                      <button class="py-2 px-3 border border-gray-300 rounded-lg hover:border-luyu-purple hover:text-luyu-purple transition-all text-sm" onclick="setProgramContribution(100000)">100K</button>
                      <button class="py-2 px-3 border border-gray-300 rounded-lg hover:border-luyu-purple hover:text-luyu-purple transition-all text-sm" onclick="setProgramContribution(250000)">250K</button>
                      <button class="py-2 px-3 border border-gray-300 rounded-lg hover:border-luyu-purple hover:text-luyu-purple transition-all text-sm" onclick="setProgramContribution(500000)">500K</button>
                  </div>
      
                  <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Pesan Dukungan (Opsional)</label>
                      <textarea class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luyu-purple focus:border-transparent" rows="3" placeholder="Tulis pesan dukungan..." id="program-support-message"></textarea>
                  </div>
              </div>
          </div>
      
          <!-- Actions -->
          <div class="flex space-x-4">
              <button class="flex-1 bg-luyu-purple text-white py-3 rounded-lg font-semibold hover:bg-luyu-purple/90 transition-all" onclick="processProgramContribution('${programId}')">
                  Kontribusi Sekarang
              </button>
              <button class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all" onclick="closeModal('wakaf-program-modal')">
                  Batal
              </button>
          </div>
      </div>
      `;
      
      showModal('wakaf-program-modal');
      
      } catch (error) {
      console.error('Error in contributeWakaf:', error);
      showNotification('Gagal memuat detail program wakaf', 'error');
      }
      }
      
      function setProgramContribution(amount) {
      try {
      const input = document.getElementById('program-contribution-amount');
      if (input) {
      input.value = amount;
      }
      } catch (error) {
      console.error('Error in setProgramContribution:', error);
      }
      }
      
      function processProgramContribution(programId) {
      try {
      const amount = parseInt(document.getElementById('program-contribution-amount').value) || 0;
      const message = document.getElementById('program-support-message').value;
      const program = wakafPrograms[programId];
      
      if (amount < 10000) {
      showNotification('Minimum kontribusi adalah Rp 10.000', 'error');
      return;
      }
      
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      closeModal('wakaf-program-modal');
      
      showNotification(`Kontribusi Rp ${amount.toLocaleString()} untuk ${program.name} berhasil`, 'success');
      
      // Update program data
      wakafPrograms[programId].collected += amount;
      wakafPrograms[programId].userContribution += amount;
      
      // Update total wakaf
      const totalWakafElement = document.getElementById('total-wakaf');
      if (totalWakafElement) {
          const currentTotal = parseInt(totalWakafElement.textContent.replace(/[^\d]/g, ''));
          totalWakafElement.textContent = `Rp ${(currentTotal + amount).toLocaleString()}`;
      }
      
      // Refresh current page if on wakaf page
      if (currentPage === 'wakaf') {
          setTimeout(() => {
              loadPageContent('wakaf');
          }, 1000);
      }
      
      }, 2500);
      
      } catch (error) {
      console.error('Error in processProgramContribution:', error);
      hideLoading();
      showNotification('Terjadi kesalahan saat memproses kontribusi', 'error');
      }
      }
      
      function showWakafDetail(programId) {
      try {
      const program = wakafPrograms[programId];
      if (!program) {
      showNotification('Program wakaf tidak ditemukan', 'error');
      return;
      }
      
      const modal = document.getElementById('wakaf-detail-modal');
      const content = document.getElementById('wakaf-detail-content');
      
      const progressPercentage = ((program.collected / program.target) * 100).toFixed(1);
      
      content.innerHTML = `
      <div class="space-y-6">
          <!-- Hero Image -->
          <div class="h-64 bg-gradient-to-br from-luyu-purple to-luyu-blue rounded-2xl relative overflow-hidden">
              <div class="absolute inset-0 bg-black/20"></div>
              <div class="absolute bottom-6 left-6 text-white">
                  <h3 class="text-2xl font-bold">${program.name}</h3>
                  <p class="text-white/90">${program.location}</p>
              </div>
              <div class="absolute top-6 right-6">
                  <span class="bg-white/90 text-luyu-purple px-4 py-2 rounded-full text-sm font-semibold">${program.category}</span>
              </div>
          </div>
      
          <!-- Description -->
          <div>
              <h4 class="text-lg font-bold text-gray-800 mb-3">Deskripsi Program</h4>
              <p class="text-gray-600 leading-relaxed">${program.description}</p>
          </div>
      
          <!-- Progress Detail -->
          <div class="bg-gray-50 p-6 rounded-xl">
              <h4 class="text-lg font-bold text-gray-800 mb-4">Progress Pembangunan</h4>
              <div class="space-y-4">
                  <div class="flex justify-between items-center">
                      <span class="text-gray-600">Target:</span>
                      <span class="font-bold text-gray-800">Rp ${(program.target / 1000000).toFixed(0)} Miliar</span>
                  </div>
                  <div class="flex justify-between items-center">
                      <span class="text-gray-600">Terkumpul:</span>
                      <span class="font-bold text-luyu-purple">Rp ${(program.collected / 1000000).toFixed(0)} Miliar</span>
                  </div>
                  <div class="progress-bar h-4">
                      <div class="progress-fill bg-luyu-purple" style="width: ${progressPercentage}%"></div>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                      <span class="text-gray-500">${progressPercentage}% tercapai</span>
                      <span class="text-gray-500">Sisa: Rp ${((program.target - program.collected) / 1000000).toFixed(1)}M</span>
                  </div>
              </div>
          </div>
      
          <!-- Benefits Grid -->
          <div>
              <h4 class="text-lg font-bold text-gray-800 mb-4">Manfaat Program</h4>
              <div class="grid grid-cols-1 gap-3">
                  ${program.benefits.map(benefit => `
                      <div class="flex items-center p-3 bg-luyu-purple/10 rounded-lg">
                          <svg class="w-5 h-5 text-luyu-purple mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          <span class="text-gray-700">${benefit}</span>
                      </div>
                  `).join('')}
              </div>
          </div>
      
          <!-- Your Contribution -->
          <div class="bg-luyu-purple/10 p-6 rounded-xl">
              <h4 class="text-lg font-bold text-gray-800 mb-3">Kontribusi Anda</h4>
              <div class="flex items-center justify-between">
                  <span class="text-gray-600">Total kontribusi:</span>
                  <span class="text-2xl font-bold text-luyu-purple">Rp ${program.userContribution.toLocaleString()}</span>
              </div>
          </div>
      
          <!-- Actions -->
          <div class="flex space-x-4">
              <button class="flex-1 bg-luyu-purple text-white py-3 rounded-lg font-semibold hover:bg-luyu-purple/90 transition-all" onclick="closeModal('wakaf-detail-modal'); contributeWakaf('${programId}');">
                  Tambah Kontribusi
              </button>
              <button class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all" onclick="shareWakafProgram('${programId}')">
                  Bagikan
              </button>
          </div>
      </div>
      `;
      
      showModal('wakaf-detail-modal');
      
      } catch (error) {
      console.error('Error in showWakafDetail:', error);
      showNotification('Gagal memuat detail program wakaf', 'error');
      }
      }
      
      function downloadWakafCertificate(certificateId) {
      try {
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      showNotification(`Sertifikat ${certificateId} berhasil diunduh`, 'success');
      
      // Simulate download
      const link = document.createElement('a');
      // Use data URL to avoid page jump and ensure download trigger
      link.href = 'data:text/plain;charset=utf-8,%0A';
      link.download = `sertifikat-wakaf-${certificateId}.pdf`;
      link.click();
      
      }, 2000);
      
      } catch (error) {
      console.error('Error in downloadWakafCertificate:', error);
      hideLoading();
      showNotification('Gagal mengunduh sertifikat', 'error');
      }
      }
      
      function shareWakafProgram(programId) {
      try {
      const program = wakafPrograms[programId];
      if (navigator.share) {
      navigator.share({
          title: `Wakaf ${program.name}`,
          text: `Mari berwakaf untuk ${program.name} di ${program.location}. ${program.description}`,
          url: window.location.href
      });
      } else {
      showNotification('Program wakaf berhasil disalin ke clipboard', 'success');
      }
      } catch (error) {
      console.error('Error in shareWakafProgram:', error);
      showNotification('Gagal membagikan program wakaf', 'error');
      }
      }
      
      function showAllWakafPrograms() {
      try {
      showNotification('Fitur jelajah semua program wakaf akan segera tersedia', 'info');
      } catch (error) {
      console.error('Error in showAllWakafPrograms:', error);
      }
      }
      
      // Kajian Online functionality
      const kajianData = {
      'fiqih-muamalah': {
      title: 'Fiqih Muamalah Modern',
      ustadz: 'Ustadz Dr. Mahmud Hasan',
      category: 'Fiqih',
      datetime: 'Besok, 20:00 WIB',
      duration: '90 menit',
      description: 'Kajian mendalam tentang fiqih muamalah dalam konteks modern, mencakup transaksi digital, e-commerce, dan keuangan syariah',
      topics: ['Transaksi Digital', 'E-commerce Syariah', 'Keuangan Modern', 'Cryptocurrency'],
      prerequisites: 'Dasar fiqih',
      maxParticipants: 500,
      currentParticipants: 347
      },
      'akhlaq-keluarga': {
      title: 'Akhlaq dalam Keluarga',
      ustadz: 'Ustadzah Dr. Siti Nurhaliza',
      category: 'Akhlaq',
      datetime: 'Kamis, 19:30 WIB',
      duration: '75 menit',
      description: 'Membangun keluarga yang sakinah mawaddah wa rahmah melalui akhlaq yang mulia',
      topics: ['Akhlaq Suami-Istri', 'Mendidik Anak', 'Hubungan dengan Mertua', 'Komunikasi Efektif'],
      prerequisites: 'Tidak ada',
      maxParticipants: 300,
      currentParticipants: 256
      },
      'tafsir-yusuf': {
      title: 'Tafsir Surat Yusuf',
      ustadz: 'Ustadz Prof. Dr. Abdullah Salim',
      category: 'Tafsir',
      datetime: 'Jumat, 21:00 WIB',
      duration: '120 menit',
      description: 'Tafsir komprehensif Surat Yusuf dengan pelajaran kehidupan yang dapat diambil',
      topics: ['Kisah Nabi Yusuf', 'Hikmah dan Pelajaran', 'Aplikasi dalam Kehidupan', 'Tafsir Kontemporer'],
      prerequisites: 'Dasar ilmu tafsir',
      maxParticipants: 1000,
      currentParticipants: 789
      }
      };
      
      const recordedKajian = {
      'hadits-40': {
      title: '40 Hadits Nawawi',
      ustadz: 'Ustadz Muhammad Hakim',
      duration: '2:15:30',
      views: 2847,
      rating: 5.0,
      description: 'Penjelasan lengkap 40 hadits pilihan Imam Nawawi'
      },
      'sirah-nabi': {
      title: 'Sirah Nabawiyah',
      ustadz: 'Ustadz Dr. Ahmad Zaki', 
      duration: '1:45:20',
      views: 1523,
      rating: 4.9,
      description: 'Sejarah kehidupan Rasulullah SAW yang penuh hikmah'
      },
      'fiqih-shalat': {
      title: 'Fiqih Shalat Lengkap',
      ustadz: 'Ustadz Ridwan Kamil',
      duration: '0:55:45',
      views: 3245,
      rating: 4.8,
      description: 'Panduan lengkap fiqih shalat dari A sampai Z'
      },
      'doa-dzikir': {
      title: 'Doa & Dzikir Harian',
      ustadz: 'Ustadzah Fatimah Az-Zahra',
      duration: '1:20:15',
      views: 1876,
      rating: 4.9,
      description: 'Kumpulan doa dan dzikir yang diamalkan sehari-hari'
      }
      };
      
      // Enhanced Live Kajian functionality
      let chatMessages = [];
      let isMobileChatOpen = false;
      let messageCount = 0;
      
      function joinLiveKajian(kajianId) {
      try {
      const modal = document.getElementById('live-kajian-modal');
      showModal('live-kajian-modal');
      
      // Initialize chat
      initializeLiveChat();
      
      // Update UI elements
      document.getElementById('live-kajian-title').textContent = 'Tafsir Surat Al-Baqarah';
      document.getElementById('live-kajian-ustadz').textContent = 'Ustadz Ahmad Syakir';
      updateParticipantCount(450);
      updateDuration('45:32');
      
      showNotification('Bergabung dengan kajian live', 'success');
      
      // Start live updates
      startLiveUpdates();
      
      // Add event listeners
      setupChatEventListeners();
      
      } catch (error) {
      console.error('Error in joinLiveKajian:', error);
      showNotification('Gagal bergabung dengan kajian live', 'error');
      }
      }
      
      function initializeLiveChat() {
      try {
      // Initial messages
      chatMessages = [
      {
          user: 'Ahmad_123',
          message: 'Barakallahu fiikum ustadz atas penjelasan yang sangat bermanfaat',
          timestamp: new Date()
      },
      {
          user: 'Siti_Muslimah', 
          message: 'Subhanallah, penjelasan yang sangat jelas dan mudah dipahami',
          timestamp: new Date()
      },
      {
          user: 'AbdulRahman',
          message: 'Ustadz, bagaimana dengan ayat selanjutnya? Apakah ada hubungannya dengan ayat sebelumnya?',
          timestamp: new Date()
      }
      ];
      
      messageCount = chatMessages.length;
      updateChatDisplay();
      updateChatCount();
      
      // Start message simulation
      setTimeout(() => {
      simulateLiveChat();
      }, 5000);
      
      } catch (error) {
      console.error('Error in initializeLiveChat:', error);
      }
      }
      
      function setupChatEventListeners() {
      try {
      // Desktop chat input
      const chatInput = document.getElementById('chat-input');
      if (chatInput) {
      chatInput.addEventListener('input', updateCharCount);
      chatInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
              sendChatMessage();
          }
      });
      }
      
      // Mobile chat input
      const mobileChatInput = document.getElementById('mobile-chat-input');
      if (mobileChatInput) {
      mobileChatInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
              sendMobileChatMessage();
          }
      });
      }
      
      } catch (error) {
      console.error('Error in setupChatEventListeners:', error);
      }
      }
      
      function updateCharCount() {
      try {
      const input = document.getElementById('chat-input');
      const counter = document.getElementById('char-count');
      
      if (input && counter) {
      const length = input.value.length;
      counter.textContent = `${length}/500`;
      
      if (length > 450) {
          counter.classList.add('text-red-500');
      } else {
          counter.classList.remove('text-red-500');
      }
      }
      } catch (error) {
      console.error('Error in updateCharCount:', error);
      }
      }
      
      function sendChatMessage() {
      try {
      const input = document.getElementById('chat-input');
      const message = input.value.trim();
      
      if (message && message.length <= 500) {
      // Add message to array
      chatMessages.push({
          user: 'Anda',
          message: message,
          timestamp: new Date(),
          isOwn: true
      });
      
      messageCount++;
      updateChatDisplay();
      updateChatCount();
      
      // Clear input
      input.value = '';
      updateCharCount();
      
      showNotification('Pesan terkirim', 'success');
      } else if (message.length > 500) {
      showNotification('Pesan terlalu panjang (maksimal 500 karakter)', 'error');
      }
      
      } catch (error) {
      console.error('Error in sendChatMessage:', error);
      }
      }
      
      function sendMobileChatMessage() {
      try {
      const input = document.getElementById('mobile-chat-input');
      const message = input.value.trim();
      
      if (message && message.length <= 500) {
      // Add message to array
      chatMessages.push({
          user: 'Anda',
          message: message,
          timestamp: new Date(),
          isOwn: true
      });
      
      messageCount++;
      updateChatDisplay();
      updateChatCount();
      
      // Clear input
      input.value = '';
      
      showNotification('Pesan terkirim', 'success');
      }
      
      } catch (error) {
      console.error('Error in sendMobileChatMessage:', error);
      }
      }
      
      function updateChatDisplay() {
      try {
      const desktopChat = document.getElementById('chat-messages');
      const mobileChat = document.getElementById('mobile-chat-messages');
      
      const chatHTML = chatMessages.map(msg => {
      const isOwn = msg.isOwn || false;
      const bgClass = isOwn ? 'bg-luyu-green/10 border-l-4 border-luyu-green' : 'bg-gray-100';
      const userClass = isOwn ? 'text-luyu-green font-semibold' : 'text-gray-500';
      
      return `
          <div class="chat-message">
              <div class="text-xs ${userClass} mb-1">${msg.user}</div>
              <div class="${bgClass} rounded-lg p-3 text-sm text-gray-700 break-words">
                  ${msg.message}
              </div>
          </div>
      `;
      }).join('');
      
      if (desktopChat) {
      desktopChat.innerHTML = `<div class="space-y-3">${chatHTML}</div>`;
      desktopChat.scrollTop = desktopChat.scrollHeight;
      }
      
      if (mobileChat) {
      mobileChat.innerHTML = `<div class="space-y-3">${chatHTML}</div>`;
      mobileChat.scrollTop = mobileChat.scrollHeight;
      }
      
      } catch (error) {
      console.error('Error in updateChatDisplay:', error);
      }
      }
      
      function updateChatCount() {
      try {
      const counter = document.getElementById('chat-count');
      if (counter) {
      counter.textContent = `${messageCount} pesan`;
      }
      } catch (error) {
      console.error('Error in updateChatCount:', error);
      }
      }
      
      function updateParticipantCount(count) {
      try {
      const elements = ['live-participants', 'mobile-participants'];
      elements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
          element.textContent = id.includes('mobile') ? count : `${count} peserta`;
      }
      });
      } catch (error) {
      console.error('Error in updateParticipantCount:', error);
      }
      }
      
      function updateDuration(duration) {
      try {
      const elements = ['live-duration', 'mobile-duration'];
      elements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
          element.textContent = duration;
      }
      });
      } catch (error) {
      console.error('Error in updateDuration:', error);
      }
      }
      
      function toggleMobileChat() {
      try {
      if (isMobileChatOpen) {
      closeMobileChat();
      } else {
      openMobileChat();
      }
      } catch (error) {
      console.error('Error in toggleMobileChat:', error);
      }
      }
      
      function openMobileChat() {
      try {
      const overlay = document.getElementById('mobile-chat-overlay');
      if (overlay) {
      overlay.classList.remove('hidden');
      updateChatDisplay();
      isMobileChatOpen = true;
      
      // Focus on input
      setTimeout(() => {
          const input = document.getElementById('mobile-chat-input');
          if (input) input.focus();
      }, 300);
      }
      } catch (error) {
      console.error('Error in openMobileChat:', error);
      }
      }
      
      function closeMobileChat() {
      try {
      const overlay = document.getElementById('mobile-chat-overlay');
      if (overlay) {
      overlay.classList.add('hidden');
      isMobileChatOpen = false;
      }
      } catch (error) {
      console.error('Error in closeMobileChat:', error);
      }
      }
      
      function simulateLiveChat() {
      try {
      const simulatedMessages = [
      { user: 'Fatimah_22', message: 'Alhamdulillah, penjelasan yang sangat bermanfaat' },
      { user: 'Abu_Bakar', message: 'Barakallahu fiikum ustadz' },
      { user: 'Aisyah_Muslimah', message: 'Mohon dijelaskan tentang ayat 255' },
      { user: 'Muhammad_87', message: 'Subhanallah, semakin paham sekarang' },
      { user: 'Khadijah_90', message: 'Jazakallahu khairan atas ilmunya' }
      ];
      
      let messageIndex = 0;
      const addMessage = () => {
      if (messageIndex < simulatedMessages.length) {
          const newMessage = {
              ...simulatedMessages[messageIndex],
              timestamp: new Date()
          };
          
          chatMessages.push(newMessage);
          messageCount++;
          updateChatDisplay();
          updateChatCount();
          
          messageIndex++;
          
          // Random interval between 3-8 seconds
          const nextInterval = 3000 + Math.random() * 5000;
          setTimeout(addMessage, nextInterval);
      }
      };
      
      addMessage();
      
      } catch (error) {
      console.error('Error in simulateLiveChat:', error);
      }
      }
      
      function startLiveUpdates() {
      try {
      // Update participant count every 30 seconds
      setInterval(() => {
      const currentCount = parseInt(document.getElementById('live-participants').textContent.match(/\d+/)[0]);
      const newCount = currentCount + Math.floor(Math.random() * 10) - 2; // +/- random
      if (newCount > 0) {
          updateParticipantCount(Math.max(newCount, 1));
      }
      }, 30000);
      
      // Update duration every second
      setInterval(() => {
      const durationElement = document.getElementById('live-duration');
      if (durationElement) {
          const timeMatch = durationElement.textContent.match(/(\d+):(\d+)/);
          if (timeMatch) {
              let minutes = parseInt(timeMatch[1]);
              let seconds = parseInt(timeMatch[2]) + 1;
              
              if (seconds >= 60) {
                  minutes += 1;
                  seconds = 0;
              }
              
              const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
              updateDuration(formattedTime);
          }
      }
      }, 1000);
      
      } catch (error) {
      console.error('Error in startLiveUpdates:', error);
      }
      }
      
      // Enhanced modal close function
      const originalCloseModal = closeModal;
      closeModal = function(modalId) {
      if (modalId === 'live-kajian-modal') {
      closeMobileChat();
      }
      originalCloseModal(modalId);
      };
      
      
      function setReminder(kajianId) {
      try {
      const kajian = kajianData[kajianId];
      if (kajian) {
      showNotification(`Reminder diset untuk kajian "${kajian.title}"`, 'success');
      }
      } catch (error) {
      console.error('Error in setReminder:', error);
      showNotification('Gagal mengatur reminder', 'error');
      }
      }
      
      function showKajianDetail(kajianId) {
      try {
      const kajian = kajianData[kajianId];
      if (!kajian) {
      showNotification('Data kajian tidak ditemukan', 'error');
      return;
      }
      
      const modal = document.getElementById('kajian-detail-modal');
      const content = document.getElementById('kajian-detail-content');
      
      content.innerHTML = `
      <div class="space-y-6">
          <!-- Header Info -->
          <div class="text-center p-6 bg-gradient-to-br from-luyu-green to-luyu-blue rounded-xl text-white">
              <h3 class="text-2xl font-bold mb-2">${kajian.title}</h3>
              <p class="text-white/90 mb-4">${kajian.ustadz}</p>
              <div class="flex justify-center items-center space-x-6 text-sm">
                  <span>${kajian.datetime}</span>
                  <span>•</span>
                  <span>${kajian.duration}</span>
                  <span>•</span>
                  <span>${kajian.currentParticipants}/${kajian.maxParticipants} peserta</span>
              </div>
          </div>
      
          <!-- Description -->
          <div>
              <h4 class="text-lg font-bold text-gray-800 mb-3">Deskripsi Kajian</h4>
              <p class="text-gray-600 leading-relaxed">${kajian.description}</p>
          </div>
      
          <!-- Topics -->
          <div>
              <h4 class="text-lg font-bold text-gray-800 mb-3">Topik Pembahasan</h4>
              <div class="grid grid-cols-2 gap-3">
                  ${kajian.topics.map(topic => `
                      <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                          <svg class="w-4 h-4 text-luyu-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span class="text-gray-700">${topic}</span>
                      </div>
                  `).join('')}
              </div>
          </div>
      
          <!-- Prerequisites -->
          <div class="bg-luyu-blue/10 p-4 rounded-xl">
              <h4 class="font-bold text-gray-800 mb-2">Prasyarat</h4>
              <p class="text-gray-600">${kajian.prerequisites}</p>
          </div>
      
          <!-- Actions -->
          <div class="flex space-x-4">
              <button class="flex-1 bg-luyu-green text-white py-3 rounded-lg font-semibold hover:bg-luyu-green/90 transition-all" onclick="setReminder('${kajianId}')">
                  <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5-5 5-5h-5m-6 10V4H4v13h5z"/>
                  </svg>
                  Set Reminder
              </button>
              <button class="flex-1 bg-luyu-blue text-white py-3 rounded-lg font-semibold hover:bg-luyu-blue/90 transition-all" onclick="shareKajian('${kajianId}')">
                  <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                  </svg>
                  Bagikan
              </button>
          </div>
      </div>
      `;
      
      showModal('kajian-detail-modal');
      
      } catch (error) {
      console.error('Error in showKajianDetail:', error);
      showNotification('Gagal memuat detail kajian', 'error');
      }
      }
      
      function playRecordedKajian(videoId) {
      try {
      const video = recordedKajian[videoId];
      if (!video) {
      showNotification('Video tidak ditemukan', 'error');
      return;
      }
      
      const modal = document.getElementById('video-player-modal');
      document.getElementById('video-title').textContent = video.title;
      document.getElementById('playing-title').textContent = video.title;
      document.getElementById('playing-ustadz').textContent = video.ustadz;
      document.getElementById('video-views').textContent = `${video.views.toLocaleString()} views • ${video.rating}/5 ⭐`;
      
      showModal('video-player-modal');
      showNotification(`Memutar: ${video.title}`, 'success');
      
      } catch (error) {
      console.error('Error in playRecordedKajian:', error);
      showNotification('Gagal memutar video', 'error');
      }
      }
      
      function downloadCertificate(certificateId) {
      try {
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      showNotification(`Sertifikat ${certificateId} berhasil diunduh`, 'success');
      
      // Simulate download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `sertifikat-kajian-${certificateId}.pdf`;
      link.click();
      
      }, 2000);
      
      } catch (error) {
      console.error('Error in downloadCertificate:', error);
      hideLoading();
      showNotification('Gagal mengunduh sertifikat', 'error');
      }
      }
      
      function toggleBookmark() {
      try {
      showNotification('Kajian ditambahkan ke bookmark', 'success');
      } catch (error) {
      console.error('Error in toggleBookmark:', error);
      }
      }
      
      function shareKajian(kajianId = null) {
      try {
      if (navigator.share) {
      navigator.share({
          title: 'Kajian Islam Online',
          text: 'Mari ikuti kajian Islam online di platform LUYU',
          url: window.location.href
      });
      } else {
      showNotification('Link kajian berhasil disalin', 'success');
      }
      } catch (error) {
      console.error('Error in shareKajian:', error);
      showNotification('Gagal membagikan kajian', 'error');
      }
      }
      
      function showKajianSchedule() {
      try {
      showNotification('Fitur jadwal lengkap akan segera tersedia', 'info');
      } catch (error) {
      console.error('Error in showKajianSchedule:', error);
      }
      }
      
      function requestKajianTopic() {
      try {
      showNotification('Fitur request topik kajian akan segera tersedia', 'info');
      } catch (error) {
      console.error('Error in requestKajianTopic:', error);
      }
      }
      
      // Simulate real-time updates for live kajian
      function startKajianUpdates() {
      try {
      setInterval(() => {
      // Update participant count
      const participantElement = document.getElementById('live-participants');
      if (participantElement) {
          const currentCount = parseInt(participantElement.textContent.match(/\d+/)[0]);
          const newCount = currentCount + Math.floor(Math.random() * 5);
          participantElement.textContent = `${newCount} peserta`;
      }
      
      // Update duration
      const durationElement = document.getElementById('live-duration');
      if (durationElement) {
          const timeMatch = durationElement.textContent.match(/(\d+):(\d+)/);
          if (timeMatch) {
              let minutes = parseInt(timeMatch[1]);
              let seconds = parseInt(timeMatch[2]) + 1;
              
              if (seconds >= 60) {
                  minutes += 1;
                  seconds = 0;
              }
              
              durationElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
          }
      }
      }, 1000);
      } catch (error) {
      console.error('Error in startKajianUpdates:', error);
      }
      }
      
      // Initialize kajian features when page loads
      document.addEventListener('DOMContentLoaded', function() {
      try {
      startKajianUpdates();
      } catch (error) {
      console.error('Error initializing kajian features:', error);
      }
      });
      
      // Settings functionality
      let currentRating = 0;
      
      function saveProfileSettings() {
      try {
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      closeModal('profile-settings-modal');
      showNotification('Profil berhasil diperbarui', 'success');
      }, 2000);
      
      } catch (error) {
      console.error('Error in saveProfileSettings:', error);
      hideLoading();
      showNotification('Gagal memperbarui profil', 'error');
      }
      }
      
      function changePassword() {
      try {
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      if (!currentPassword || !newPassword || !confirmPassword) {
      showNotification('Mohon lengkapi semua field password', 'error');
      return;
      }
      
      if (newPassword !== confirmPassword) {
      showNotification('Konfirmasi password tidak cocok', 'error');
      return;
      }
      
      if (newPassword.length < 8) {
      showNotification('Password baru minimal 8 karakter', 'error');
      return;
      }
      
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      showNotification('Password berhasil diubah', 'success');
      
      // Clear form
      document.getElementById('current-password').value = '';
      document.getElementById('new-password').value = '';
      document.getElementById('confirm-password').value = '';
      }, 2500);
      
      } catch (error) {
      console.error('Error in changePassword:', error);
      hideLoading();
      showNotification('Gagal mengubah password', 'error');
      }
      }
      
      function addPaymentMethod(type) {
      try {
      if (type === 'card') {
      showNotification('Fitur tambah kartu akan segera tersedia', 'info');
      } else {
      showNotification(`Fitur tambah ${type} akan segera tersedia`, 'info');
      }
      } catch (error) {
      console.error('Error in addPaymentMethod:', error);
      }
      }
      
      function clearCache() {
      try {
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      showNotification('Cache berhasil dihapus', 'success');
      }, 2000);
      
      } catch (error) {
      console.error('Error in clearCache:', error);
      hideLoading();
      showNotification('Gagal menghapus cache', 'error');
      }
      }
      
      function manageDownloads() {
      try {
      showNotification('Fitur kelola download akan segera tersedia', 'info');
      } catch (error) {
      console.error('Error in manageDownloads:', error);
      }
      }
      
      function exportUserData() {
      try {
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      showNotification('Data profil berhasil di-export', 'success');
      
      // Simulate download
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'luyu-profile-data.json';
      link.click();
      }, 2500);
      
      } catch (error) {
      console.error('Error in exportUserData:', error);
      hideLoading();
      showNotification('Gagal export data profil', 'error');
      }
      }
      
      function exportTransactionData() {
      try {
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      showNotification('Data transaksi berhasil di-export', 'success');
      
      // Simulate download
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'luyu-transaction-data.csv';
      link.click();
      }, 3000);
      
      } catch (error) {
      console.error('Error in exportTransactionData:', error);
      hideLoading();
      showNotification('Gagal export data transaksi', 'error');
      }
      }
      
      function checkForUpdates() {
      try {
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      showNotification('Aplikasi sudah versi terbaru', 'success');
      }, 2000);
      
      } catch (error) {
      console.error('Error in checkForUpdates:', error);
      hideLoading();
      showNotification('Gagal cek update', 'error');
      }
      }
      
      function showFAQ() {
      try {
      showNotification('Membuka halaman FAQ...', 'info');
      setTimeout(() => {
      window.open('#', '_blank');
      }, 1000);
      } catch (error) {
      console.error('Error in showFAQ:', error);
      }
      }
      
      function contactSupport() {
      try {
      showNotification('Menghubungkan ke customer support...', 'info');
      setTimeout(() => {
      showNotification('Support tersedia 24/7 via WhatsApp: +62 811-LUYU-001', 'success');
      }, 1500);
      } catch (error) {
      console.error('Error in contactSupport:', error);
      }
      }
      
      function showPrivacyPolicy() {
      try {
      showNotification('Membuka Privacy Policy...', 'info');
      setTimeout(() => {
      window.open('#', '_blank');
      }, 1000);
      } catch (error) {
      console.error('Error in showPrivacyPolicy:', error);
      }
      }
      
      function showTermsOfService() {
      try {
      showNotification('Membuka Terms of Service...', 'info');
      setTimeout(() => {
      window.open('#', '_blank');
      }, 1000);
      } catch (error) {
      console.error('Error in showTermsOfService:', error);
      }
      }
      
      function setRating(rating) {
      try {
      currentRating = rating;
      
      // Update star display
      const stars = document.querySelectorAll('#feedback-modal button[onclick*="setRating"]');
      stars.forEach((star, index) => {
      if (index < rating) {
          star.className = 'text-3xl text-luyu-gold transition-all';
      } else {
          star.className = 'text-3xl text-gray-300 hover:text-luyu-gold transition-all';
      }
      });
      
      } catch (error) {
      console.error('Error in setRating:', error);
      }
      }
      
      function submitFeedback() {
      try {
      const category = document.getElementById('feedback-category').value;
      const message = document.getElementById('feedback-message').value;
      const allowContact = document.getElementById('feedback-contact').checked;
      
      if (!message.trim()) {
      showNotification('Mohon tulis pesan feedback', 'error');
      return;
      }
      
      if (currentRating === 0) {
      showNotification('Mohon berikan rating untuk aplikasi', 'error');
      return;
      }
      
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      closeModal('feedback-modal');
      showNotification('Terima kasih atas feedback Anda!', 'success');
      
      // Clear form
      document.getElementById('feedback-message').value = '';
      document.getElementById('feedback-contact').checked = false;
      currentRating = 0;
      
      // Reset stars
      const stars = document.querySelectorAll('#feedback-modal button[onclick*="setRating"]');
      stars.forEach(star => {
          star.className = 'text-3xl text-gray-300 hover:text-luyu-gold transition-all';
      });
      
      }, 2500);
      
      } catch (error) {
      console.error('Error in submitFeedback:', error);
      hideLoading();
      showNotification('Gagal mengirim feedback', 'error');
      }
      }
      
      function resetSettings() {
      try {
      const resetNotifications = document.getElementById('reset-notifications').checked;
      const resetPrivacy = document.getElementById('reset-privacy').checked;
      const resetIslamic = document.getElementById('reset-islamic').checked;
      const resetDisplay = document.getElementById('reset-display').checked;
      
      if (!resetNotifications && !resetPrivacy && !resetIslamic && !resetDisplay) {
      showNotification('Pilih minimal satu kategori untuk direset', 'error');
      return;
      }
      
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      closeModal('reset-settings-modal');
      showNotification('Pengaturan berhasil direset ke default', 'success');
      
      // Reset checkboxes
      document.getElementById('reset-notifications').checked = false;
      document.getElementById('reset-privacy').checked = false;
      document.getElementById('reset-islamic').checked = false;
      document.getElementById('reset-display').checked = false;
      
      }, 3000);
      
      } catch (error) {
      console.error('Error in resetSettings:', error);
      hideLoading();
      showNotification('Gagal reset pengaturan', 'error');
      }
      }
      
      function deactivateAccount() {
      try {
      const reason = document.getElementById('deactivate-reason').value;
      
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      closeModal('deactivate-account-modal');
      showNotification('Akun berhasil dinonaktifkan', 'success');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
          showNotification('Mengarahkan ke halaman login...', 'info');
      }, 3000);
      
      }, 2500);
      
      } catch (error) {
      console.error('Error in deactivateAccount:', error);
      hideLoading();
      showNotification('Gagal menonaktifkan akun', 'error');
      }
      }
      
      function deleteAccount() {
      try {
      const confirmation = document.getElementById('delete-confirmation').value;
      const password = document.getElementById('delete-password').value;
      
      if (confirmation !== 'HAPUS AKUN') {
      showNotification('Mohon ketik "HAPUS AKUN" untuk konfirmasi', 'error');
      return;
      }
      
      if (!password) {
      showNotification('Mohon masukkan password Anda', 'error');
      return;
      }
      
      showLoading();
      
      setTimeout(() => {
      hideLoading();
      closeModal('delete-account-modal');
      showNotification('Akun berhasil dihapus. Terima kasih telah menggunakan LUYU.', 'success');
      
      // Redirect after 5 seconds
      setTimeout(() => {
          showNotification('Mengarahkan ke halaman utama...', 'info');
      }, 5000);
      
      }, 3000);
      
      } catch (error) {
      console.error('Error in deleteAccount:', error);
      hideLoading();
      showNotification('Gagal menghapus akun', 'error');
      }
      }
      
      // Settings auto-save functionality
      function initializeSettingsAutoSave() {
      try {
      // Listen to all switch changes and save automatically
      document.addEventListener('change', function(e) {
      if (e.target.type === 'checkbox' && e.target.closest('.switch')) {
          const settingId = e.target.id;
          const isChecked = e.target.checked;
          
          // Save to localStorage
          localStorage.setItem(`luyu_setting_${settingId}`, isChecked);
          
          // Show brief notification for important settings
          if (['push-notifications', 'gps-tracking', 'auto-backup'].includes(settingId)) {
              const settingName = settingId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
              showNotification(`${settingName} ${isChecked ? 'diaktifkan' : 'dinonaktifkan'}`, 'info');
          }
      }
      });
      
      // Listen to select changes
      document.addEventListener('change', function(e) {
      if (e.target.tagName === 'SELECT') {
          const settingId = e.target.id;
          const value = e.target.value;
          
          localStorage.setItem(`luyu_setting_${settingId}`, value);
          
          // Handle specific settings
          switch(settingId) {
              case 'app-theme':
                  applyTheme(value);
                  break;
              case 'app-language':
                  applyLanguage(value);
                  break;
              case 'font-size':
                  applyFontSize(value);
                  break;
          }
      }
      });
      
      } catch (error) {
      console.error('Error in initializeSettingsAutoSave:', error);
      }
      }
      
      function loadSavedSettings() {
      try {
      // Load saved settings from localStorage
      const settings = {};
      for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('luyu_setting_')) {
          const settingId = key.replace('luyu_setting_', '');
          const value = localStorage.getItem(key);
          settings[settingId] = value;
      }
      }
      
      // Apply saved settings
      Object.keys(settings).forEach(settingId => {
      const element = document.getElementById(settingId);
      if (element) {
          if (element.type === 'checkbox') {
              element.checked = settings[settingId] === 'true';
          } else {
              element.value = settings[settingId];
          }
      }
      });
      
      } catch (error) {
      console.error('Error in loadSavedSettings:', error);
      }
      }
      
      function applyTheme(theme) {
      try {
      document.body.className = document.body.className.replace(/theme-\w+/g, '');
      if (theme !== 'light') {
      document.body.classList.add(`theme-${theme}`);
      }
      showNotification(`Theme diubah ke ${theme}`, 'info');
      } catch (error) {
      console.error('Error in applyTheme:', error);
      }
      }
      
      function applyLanguage(language) {
      try {
      document.documentElement.lang = language;
      showNotification('Bahasa aplikasi akan berubah setelah restart', 'info');
      } catch (error) {
      console.error('Error in applyLanguage:', error);
      }
      }
      
      function applyFontSize(size) {
      try {
      document.body.className = document.body.className.replace(/font-size-\w+/g, '');
      document.body.classList.add(`font-size-${size}`);
      showNotification(`Ukuran font diubah ke ${size}`, 'info');
      } catch (error) {
      console.error('Error in applyFontSize:', error);
      }
      }
      
      // Initialize settings when page loads
      document.addEventListener('DOMContentLoaded', function() {
      try {
      initializeSettingsAutoSave();
      loadSavedSettings();
      } catch (error) {
      console.error('Error initializing settings:', error);
      }
      });
      
      // Mobile responsive functionality
      let isMobileSidebarOpen = false;
      
      function toggleMobileSidebar() {
      try {
      const sidebar = document.querySelector('aside');
      const overlay = document.getElementById('mobile-overlay');
      const hamburger = document.querySelector('.hamburger-menu');
      
      if (isMobileSidebarOpen) {
      closeMobileSidebar();
      } else {
      openMobileSidebar();
      }
      } catch (error) {
      console.error('Error in toggleMobileSidebar:', error);
      }
      }
      
      function openMobileSidebar() {
      try {
      const sidebar = document.querySelector('aside');
      const overlay = document.getElementById('mobile-overlay');
      const hamburger = document.querySelector('.hamburger-menu');
      
      sidebar.classList.add('mobile-open');
      overlay.classList.add('active');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      isMobileSidebarOpen = true;
      } catch (error) {
      console.error('Error in openMobileSidebar:', error);
      }
      }
      
      function closeMobileSidebar() {
      try {
      const sidebar = document.querySelector('aside');
      const overlay = document.getElementById('mobile-overlay');
      const hamburger = document.querySelector('.hamburger-menu');
      
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = 'auto'; // Re-enable background scrolling
      
      isMobileSidebarOpen = false;
      } catch (error) {
      console.error('Error in closeMobileSidebar:', error);
      }
      }
      
      // Close sidebar when clicking on sidebar items (mobile)
      function handleSidebarItemClick() {
      if (window.innerWidth <= 1024) {
      closeMobileSidebar();
      }
      }
      
      // Touch gesture support for mobile sidebar
      let touchStartX = 0;
      let touchEndX = 0;
      
      function handleTouchStart(e) {
      touchStartX = e.changedTouches[0].screenX;
      }
      
      function handleTouchEnd(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
      }
      
      function handleSwipeGesture() {
      const swipeThreshold = 50;
      const swipeDistance = touchEndX - touchStartX;
      
      // Swipe right to open sidebar (from left edge)
      if (swipeDistance > swipeThreshold && touchStartX < 50 && !isMobileSidebarOpen) {
      openMobileSidebar();
      }
      
      // Swipe left to close sidebar
      if (swipeDistance < -swipeThreshold && isMobileSidebarOpen) {
      closeMobileSidebar();
      }
      }
      
      // Initialize mobile responsiveness
      function initializeMobileResponsiveness() {
      try {
      // Add touch event listeners
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // Close sidebar when clicking overlay
      const overlay = document.getElementById('mobile-overlay');
      if (overlay) {
        overlay.addEventListener('click', function() {
          closeMobileSidebar();
        });
      }
      
      // Close sidebar on window resize to desktop
      window.addEventListener('resize', function() {
      if (window.innerWidth > 1024 && isMobileSidebarOpen) {
          closeMobileSidebar();
      }
      });
      
      // Add click handlers to sidebar items for mobile
      document.querySelectorAll('.sidebar-item').forEach(item => {
      item.addEventListener('click', handleSidebarItemClick);
      });
      
      // Prevent body scroll when modals are open on mobile
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
      modal.addEventListener('click', function(e) {
          if (e.target === this) {
              document.body.style.overflow = 'auto';
          }
      });
      });
      
      } catch (error) {
      console.error('Error in initializeMobileResponsiveness:', error);
      }
      }
      
      // Enhanced showPage function for mobile
      const originalShowPage = showPage;
      showPage = function(pageId) {
      originalShowPage(pageId);
      
      // Close mobile sidebar when navigating on mobile
      if (window.innerWidth <= 1024) {
      setTimeout(() => {
      closeMobileSidebar();
      }, 100);
      }
      };
      
      // Initialize when page loads
      document.addEventListener('DOMContentLoaded', function() {
      initializeMobileResponsiveness();
      });
      
      // Dark Mode Functionality - FIXED
      let isDarkMode = false;
      
      function initializeDarkMode() {
      try {
      // Check saved preference or system preference
      const savedTheme = localStorage.getItem('luyu-theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      isDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
      
      // Apply theme without animation on initial load
      document.documentElement.classList.add('theme-transition');
      
      if (isDarkMode) {
      document.documentElement.classList.add('dark');
      }
      
      // Update icons and tooltip immediately
      updateThemeIcons();
      updateThemeTooltip();
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);
      
      } catch (error) {
      console.error('Error initializing dark mode:', error);
      }
      }
      
      function toggleDarkMode() {
      try {
      // Add loading state
      const toggleButton = document.getElementById('dark-mode-toggle');
      toggleButton.style.pointerEvents = 'none';
      
      // Add icon animation
      const sunIcon = document.getElementById('sun-icon');
      const moonIcon = document.getElementById('moon-icon');
      
      // Trigger animation
      sunIcon.classList.add('theme-icon-animation');
      moonIcon.classList.add('theme-icon-animation');
      
      // Toggle theme
      isDarkMode = !isDarkMode;
      
      if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('luyu-theme', 'dark');
      showNotification('Switched to Dark Mode', 'success');
      } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('luyu-theme', 'light');
      showNotification('Switched to Light Mode', 'success');
      }
      
      // Update icons and tooltip
      updateThemeIcons();
      updateThemeTooltip();
      
      // Re-enable button after animation
      setTimeout(() => {
      toggleButton.style.pointerEvents = 'auto';
      sunIcon.classList.remove('theme-icon-animation');
      moonIcon.classList.remove('theme-icon-animation');
      }, 500);
      
      // Update any dynamic content that needs theme adjustment
      updateThemeSpecificContent();
      
      } catch (error) {
      console.error('Error toggling dark mode:', error);
      showNotification('Failed to switch theme', 'error');
      }
      }
      
      function updateThemeIcons() {
      try {
      const sunIcon = document.getElementById('sun-icon');
      const moonIcon = document.getElementById('moon-icon');
      
      if (isDarkMode) {
      // Dark mode active - show moon
      sunIcon.style.opacity = '0';
      sunIcon.style.transform = 'rotate(90deg) scale(0)';
      moonIcon.style.opacity = '1';
      moonIcon.style.transform = 'rotate(0deg) scale(1)';
      } else {
      // Light mode active - show sun
      sunIcon.style.opacity = '1';
      sunIcon.style.transform = 'rotate(0deg) scale(1)';
      moonIcon.style.opacity = '0';
      moonIcon.style.transform = 'rotate(90deg) scale(0)';
      }
      } catch (error) {
      console.error('Error updating theme icons:', error);
      }
      }
      
      function updateThemeTooltip() {
      try {
      const tooltip = document.getElementById('theme-tooltip');
      if (tooltip) {
      tooltip.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
      }
      } catch (error) {
      console.error('Error updating theme tooltip:', error);
      }
      }
      
      function updateThemeSpecificContent() {
      try {
      // Update dashboard numbers to ensure they're visible
      updateDashboardNumbers();
      
      // Update map colors if on maps page
      if (currentPage === 'maps') {
      updateMapTheme(isDarkMode);
      }
      
      // Update any other theme-dependent components
      updateComponentThemes();
      
      } catch (error) {
      console.error('Error updating theme-specific content:', error);
      }
      }
      
      function updateDashboardNumbers() {
      try {
      // Force update dashboard numbers color
      const dashboardNumbers = document.querySelectorAll('.text-3xl, .text-2xl, .text-xl');
      dashboardNumbers.forEach(element => {
      if (element.closest('.bg-white')) {
          if (isDarkMode) {
              element.style.color = '#f9fafb';
          } else {
              element.style.color = '';
          }
      }
      });
      
      // Update specific dashboard stat elements
      const statElements = document.querySelectorAll('[class*="font-bold"]');
      statElements.forEach(element => {
      if (element.closest('.bg-white') && !element.closest('.text-luyu-')) {
          if (isDarkMode) {
              element.style.color = '#f9fafb';
          } else {
              element.style.color = '';
          }
      }
      });
      
      } catch (error) {
      console.error('Error updating dashboard numbers:', error);
      }
      }
      
      // Map theme updates - FIXED for Cluster B
      function updateMapTheme(isDark) {
      try {
      // Update SVG map colors
      const mapSvg = document.querySelector('#interactive-map svg');
      if (mapSvg) {
      // Update background
      const bgRect = mapSvg.querySelector('rect');
      if (bgRect) {
          bgRect.setAttribute('fill', isDark ? '#374151' : '#f8f9fa');
      }
      
      // Update Cluster B specifically
      const clusterB = mapSvg.querySelector('.cluster-zone[data-cluster="b"] rect');
      if (clusterB) {
          if (isDark) {
              clusterB.setAttribute('fill', 'rgba(251, 191, 36, 0.15)');
              clusterB.setAttribute('stroke', '#fbbf24');
          } else {
              clusterB.setAttribute('fill', '#f39c1220');
              clusterB.setAttribute('stroke', '#f39c12');
          }
      }
      
      // Update Cluster B text
      const clusterBTexts = mapSvg.querySelectorAll('.cluster-zone[data-cluster="b"] text');
      clusterBTexts.forEach(text => {
          if (isDark) {
              text.setAttribute('fill', '#fbbf24');
          } else {
              text.classList.add('fill-orange-600');
          }
      });
      
      // Update driver markers
      const orangeMarkers = mapSvg.querySelectorAll('.driver-marker[fill="#f39c12"]');
      orangeMarkers.forEach(marker => {
          if (isDark) {
              marker.setAttribute('fill', '#fbbf24');
              marker.setAttribute('stroke', '#1f2937');
          } else {
              marker.setAttribute('fill', '#f39c12');
              marker.setAttribute('stroke', 'white');
          }
      });
      }
      
      } catch (error) {
      console.error('Error updating map theme:', error);
      }
      }
      
      // Enhanced page loading with theme fixes
      const originalLoadPageContent = loadPageContent;
      loadPageContent = function(pageId) {
      originalLoadPageContent(pageId);
      
      // Apply theme fixes after page loads
      setTimeout(() => {
      updateThemeSpecificContent();
      }, 100);
      };
      
      // Initialize dark mode when page loads
      document.addEventListener('DOMContentLoaded', function() {
      initializeDarkMode();
      
      // Additional fix for initial load
      setTimeout(() => {
      updateThemeSpecificContent();
      }, 500);
      });
      
      class PreloaderManager {
      constructor(options = {}) {
        this.options = {
            duration: 3000,
            showProgress: true,
            autoHide: true,
            customLogo: null,
            appName: 'LUYU',
            tagline: 'Ojek Online Syariah',
            loadingTexts: [
                'Memuat aplikasi...',
                'Menyiapkan interface...',
                'Menghubungkan server...',
                'Hampir selesai...'
            ],
            onComplete: null,
            ...options
        };
        
        this.currentProgress = 0;
        this.currentTextIndex = 0;
        this.progressInterval = null;
        this.textInterval = null;
        
        this.init();
      }
      
      init() {
        this.setupCustomization();
        this.startProgress();
        this.startTextRotation();
        
        if (this.options.autoHide) {
            this.startAutoHide();
        }
      }
      
      setupCustomization() {
        const appNameEl = document.getElementById('app-name');
        const taglineEl = document.getElementById('app-tagline');
        
        if (appNameEl) appNameEl.textContent = this.options.appName;
        if (taglineEl) taglineEl.textContent = this.options.tagline;
        
        if (this.options.customLogo) {
            this.setCustomLogo(this.options.customLogo);
        }
      }
      
      setCustomLogo(logoSrc) {
        const defaultLogo = document.getElementById('default-logo');
        const customLogo = document.getElementById('custom-logo');
        const customImg = document.getElementById('custom-logo-img');
        
        if (defaultLogo && customLogo && customImg) {
            defaultLogo.classList.add('hidden');
            customLogo.classList.remove('hidden');
            customImg.src = logoSrc;
        }
      }
      
      startProgress() {
        if (!this.options.showProgress) return;
        
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-percentage');
        
        this.progressInterval = setInterval(() => {
            if (this.currentProgress < 100) {
                const increment = Math.random() * 15 + 5;
                this.currentProgress = Math.min(100, this.currentProgress + increment);
                
                if (progressFill) {
                    progressFill.style.width = `${this.currentProgress}%`;
                }
                
                if (progressText) {
                    progressText.textContent = `${Math.round(this.currentProgress)}%`;
                }
                
                if (this.currentProgress > 90) {
                    clearInterval(this.progressInterval);
                    this.finishProgress();
                }
            }
        }, 100);
      }
      
      finishProgress() {
        setTimeout(() => {
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-percentage');
            
            if (progressFill) progressFill.style.width = '100%';
            if (progressText) progressText.textContent = '100%';
            
            if (this.options.onComplete) {
                this.options.onComplete();
            }
        }, 200);
      }
      
      startTextRotation() {
        if (this.options.loadingTexts.length <= 1) return;
        
        const loadingTextEl = document.getElementById('loading-text');
        
        this.textInterval = setInterval(() => {
            this.currentTextIndex = (this.currentTextIndex + 1) % this.options.loadingTexts.length;
            
            if (loadingTextEl) {
                loadingTextEl.style.opacity = '0';
                
                setTimeout(() => {
                    loadingTextEl.textContent = this.options.loadingTexts[this.currentTextIndex];
                    loadingTextEl.style.opacity = '1';
                }, 200);
            }
        }, 800);
      }
      
      startAutoHide() {
        setTimeout(() => {
            this.hide();
        }, this.options.duration);
      }
      
      hide() {
        if (this.progressInterval) clearInterval(this.progressInterval);
        if (this.textInterval) clearInterval(this.textInterval);
        
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
                this.onPreloaderComplete();
            }, 800);
        }
      }
      
      onPreloaderComplete() {
        console.log('LUYU Preloader completed!');
        
        // Initialize app jika diperlukan
        if (typeof initializeApp === 'function') {
            initializeApp();
        }
      }
      
      // Public methods
      setProgress(percentage) {
        this.currentProgress = Math.max(0, Math.min(100, percentage));
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-percentage');
        
        if (progressFill) progressFill.style.width = `${this.currentProgress}%`;
        if (progressText) progressText.textContent = `${Math.round(this.currentProgress)}%`;
      }
      
      setLoadingText(text) {
        const loadingTextEl = document.getElementById('loading-text');
        if (loadingTextEl) {
            loadingTextEl.textContent = text;
        }
      }
      }
      
      // Global instance
      let preloaderInstance = null;
      
      // Auto-initialize when DOM ready
      document.addEventListener('DOMContentLoaded', function() {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Initialize preloader
      preloaderInstance = new PreloaderManager({
        duration: 3500,
        showProgress: true,
        autoHide: true,
        onComplete: function() {
            console.log('App loaded successfully!');
        }
      });
      });
      
      // Utility functions
      function hidePreloader() {
      if (preloaderInstance) preloaderInstance.hide();
      }
      
      function setPreloaderProgress(percentage) {
      if (preloaderInstance) preloaderInstance.setProgress(percentage);
      }
      
      function updatePreloaderText(text) {
      if (preloaderInstance) preloaderInstance.setLoadingText(text);
      }
