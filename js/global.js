document.addEventListener("DOMContentLoaded", () => {
    // ১. গ্লোবাল হেডার রেন্ডার
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header style="background: #ffffff; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 1000;">
                <div style="max-width: 1150px; margin: 0 auto; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center;">
                    <a href="/" style="font-size: 1.3rem; font-weight: 700; color: #0d5c46; text-decoration: none; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-moon"></i> Islamic Light
                    </a>
                    <nav style="display: flex; gap: 15px; font-size: 0.95rem; font-weight: 500;">
                        <a href="/" style="color: #2d3748; text-decoration: none;">হোম</a>
                        <a href="https://islamiclight.in" target="_blank" style="color: #0d5c46; text-decoration: none;">মূল ওয়েবসাইট <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 11px;"></i></a>
                    </nav>
                </div>
            </header>
        `;
    }

    // ২. গ্লোবাল ফুটার রেন্ডার
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer style="background: #0d2920; color: #cbd5e1; padding: 40px 20px 20px; margin-top: 60px; font-size: 0.9rem;">
                <div style="max-width: 1150px; margin: 0 auto; text-align: center;">
                    <h3 style="color: #ffffff; font-size: 1.2rem; margin-bottom: 10px;">Islamic Light — গাইড ও প্যারেন্টিং</h3>
                    <p style="max-width: 600px; margin: 0 auto 20px; color: #94a3b8; font-size: 0.88rem;">
                        কুরআন ও সুন্নাহর সঠিক জ্ঞান প্রচার এবং সমাজকে চারিত্রিক ফিতনা থেকে রক্ষা করাই আমাদের মূল লক্ষ্য।
                    </p>
                    <div style="border-top: 1px solid #1f473b; padding-top: 15px; font-size: 0.85rem; color: #64748b;">
                        © ${new Date().getFullYear()} islamiclight.in — সর্বস্বত্ব সংরক্ষিত
                    </div>
                </div>
            </footer>
        `;
    }
});

