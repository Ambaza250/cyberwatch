const appState = {
    activeView: "dashboard",
    logFilter: "all",
    isSidebarCollapsed: false,
    logs: [
        { userId: "USR001", username: "alice_admin", loginTime: "2026-04-20 07:12:04", status: "Success", ip: "192.168.1.101" },
        { userId: "USR002", username: "bob_smith", loginTime: "2026-04-20 07:15:33", status: "Failure", ip: "10.0.0.45" },
        { userId: "USR003", username: "carol_dev", loginTime: "2026-04-20 07:23:55", status: "Success", ip: "192.168.1.102" },
        { userId: "USR002", username: "bob_smith", loginTime: "2026-04-20 07:16:01", status: "Failure", ip: "10.0.0.45" },
        { userId: "USR001", username: "alice_admin", loginTime: "2026-04-20 07:12:04", status: "Success", ip: "192.168.1.101" },
        { userId: "USR001", username: "alice_admin", loginTime: "2026-04-20 07:12:04", status: "Success", ip: "192.168.1.101" },
        { userId: "USR001", username: "alice_admin", loginTime: "2026-04-20 07:12:04", status: "Success", ip: "192.168.1.101" },
        { userId: "USR002", username: "bob_smith", loginTime: "2026-04-20 07:16:01", status: "Failure", ip: "10.0.0.45" }
    ],
    alerts: [
        {
            level: "HIGH",
            username: "bob_smith",
            userId: "USR002",
            message: "7 consecutive failed login attempts detected",
            ip: "10.0.0.45",
            time: "4/20/2026, 9:52:45 PM",
            attempts: "7 failed attempts"
        },
        {
            level: "HIGH",
            username: "eve_analyst",
            userId: "USR005",
            message: "10 consecutive failed login attempts detected",
            ip: "203.0.113.55",
            time: "4/20/2026, 9:52:45 PM",
            attempts: "10 failed attempts"
        },
        {
            level: "HIGH",
            username: "hank_finance",
            userId: "USR008",
            message: "16 consecutive failed login attempts detected",
            ip: "198.51.100.2",
            time: "4/20/2026, 9:52:45 PM",
            attempts: "16 failed attempts"
        },
        {
            level: "HIGH",
            username: "leo_qa",
            userId: "USR012",
            message: "20 consecutive failed login attempts detected",
            ip: "203.0.113.77",
            time: "4/20/2026, 9:52:45 PM",
            attempts: "20 failed attempts"
        },
        {
            level: "MEDIUM",
            username: "maya_ops",
            userId: "USR014",
            message: "4 consecutive failed login attempts detected",
            ip: "198.51.100.22",
            time: "4/20/2026, 9:52:45 PM",
            attempts: "4 failed attempts"
        },
        {
            level: "LOW",
            username: "oliver_it",
            userId: "USR017",
            message: "3 consecutive failed login attempts detected",
            ip: "10.10.10.17",
            time: "4/20/2026, 9:52:45 PM",
            attempts: "3 failed attempts"
        },
        {
            level: "LOW",
            username: "ruth_admin",
            userId: "USR018",
            message: "3 consecutive failed login attempts detected",
            ip: "10.10.10.18",
            time: "4/20/2026, 9:52:45 PM",
            attempts: "3 failed attempts"
        },
        {
            level: "LOW",
            username: "sam_guest",
            userId: "USR019",
            message: "3 consecutive failed login attempts detected",
            ip: "10.10.10.19",
            time: "4/20/2026, 9:52:45 PM",
            attempts: "3 failed attempts"
        }
    ]
};

const elements = {
    loginScreen: document.getElementById("loginScreen"),
    appShell: document.getElementById("appShell"),
    loginForm: document.getElementById("loginForm"),
    shellGrid: document.getElementById("shellGrid"),
    sidebarToggle: document.getElementById("sidebarToggle"),
    navItems: Array.from(document.querySelectorAll(".nav-item[data-view]")),
    routeButtons: Array.from(document.querySelectorAll("[data-view-target]")),
    views: Array.from(document.querySelectorAll(".view")),
    dashboardStats: document.getElementById("dashboardStats"),
    dashboardTableBody: document.getElementById("dashboardTableBody"),
    logsSearch: document.getElementById("logsSearch"),
    logsTableBody: document.getElementById("logsTableBody"),
    filterButtons: Array.from(document.querySelectorAll(".pill-button[data-filter]")),
    severityStats: document.getElementById("severityStats"),
    alertsList: document.getElementById("alertsList"),
    reportStats: document.getElementById("reportStats"),
    reportsTableBody: document.getElementById("reportsTableBody"),
    logoutBtn: document.getElementById("logoutBtn"),
    refreshDashboardBtn: document.getElementById("refreshDashboardBtn"),
    refreshLogsBtn: document.getElementById("refreshLogsBtn"),
    detectBtn: document.getElementById("detectBtn"),
    clearAlertsBtn: document.getElementById("clearAlertsBtn"),
    exportBtn: document.getElementById("exportBtn"),
    toastStack: document.getElementById("toastStack")
};

function statCards() {
    const failures = appState.logs.filter(item => item.status === "Failure").length;
    const successes = appState.logs.filter(item => item.status === "Success").length;
    return [
        { label: "Total Logs", value: appState.logs.length, tone: "tone-blue" },
        { label: "Failed Attempts", value: failures, tone: "tone-red" },
        { label: "Successful login", value: successes, tone: "tone-green" },
        { label: "Suspicious activities", value: appState.alerts.length ? 0 : 0, tone: "tone-gold" }
    ];
}

function highAlerts() {
    return appState.alerts.filter(alert => alert.level === "HIGH");
}

function reportCards() {
    const successes = appState.logs.filter(item => item.status === "Success").length;
    const failures = appState.logs.filter(item => item.status === "Failure").length;
    return [
        { label: "Total Attempts", value: appState.logs.length, tone: "tone-blue" },
        { label: "Successful", value: successes, tone: "tone-green" },
        { label: "Failed", value: failures, tone: "tone-red" },
        { label: "Alerts Generated", value: appState.alerts.length, tone: "tone-gold" }
    ];
}

function severityCards() {
    const counts = appState.alerts.reduce((acc, alert) => {
        acc[alert.level] = (acc[alert.level] || 0) + 1;
        return acc;
    }, {});

    return [
        { label: "HIGH Severity", value: counts.HIGH || 0, className: "severity-high tone-red" },
        { label: "Medium Severity", value: counts.MEDIUM || 0, className: "severity-medium tone-gold" },
        { label: "Low Severity", value: counts.LOW || 0, className: "severity-low tone-blue" }
    ];
}

function renderStatGrid(target, cards) {
    target.innerHTML = cards.map(card => `
        <article class="stat-card ${card.tone || ""} ${card.className || ""}">
            <h3>${card.label}</h3>
            <strong>${card.value}</strong>
        </article>
    `).join("");
}

function tableRows(rows, includeRisk = false) {
    return rows.map(row => `
        <tr>
            <td>${row.userId}</td>
            <td>${row.username}</td>
            <td>${row.loginTime}</td>
            <td class="${row.status === "Success" ? "status-success" : "status-failure"}">${row.status}</td>
            <td>${row.ip}</td>
            ${includeRisk ? `<td class="${row.status === "Success" ? "risk-low" : "risk-high"}">${row.status === "Success" ? "LOW" : "HIGH"}</td>` : ""}
        </tr>
    `).join("");
}

function filteredLogs() {
    const query = elements.logsSearch.value.trim().toLowerCase();
    return appState.logs.filter(row => {
        const matchesQuery = !query || [row.userId, row.username, row.ip].some(value => value.toLowerCase().includes(query));
        const matchesFilter =
            appState.logFilter === "all" ||
            (appState.logFilter === "success" && row.status === "Success") ||
            (appState.logFilter === "failure" && row.status === "Failure");
        return matchesQuery && matchesFilter;
    });
}

function renderDashboard() {
    renderStatGrid(elements.dashboardStats, statCards());
    elements.dashboardTableBody.innerHTML = tableRows(appState.logs.slice(0, 5));
}

function renderLogs() {
    elements.logsTableBody.innerHTML = tableRows(filteredLogs());
}

function renderAlerts() {
    renderStatGrid(elements.severityStats, severityCards());
    const urgentAlerts = highAlerts();
    elements.alertsList.innerHTML = urgentAlerts.map(alert => `
        <article class="alert-card high-alert">
            <div class="alert-top">
                <span class="alert-level severity-${alert.level.toLowerCase()}">${alert.level}</span>
                <span class="alert-user">${alert.username}</span>
                <span class="alert-id">(${alert.userId})</span>
            </div>
            <p class="alert-message">${alert.message}</p>
            <div class="alert-meta">
                <span>${alert.ip}</span>
                <span>${alert.time}</span>
                <span>${alert.attempts}</span>
            </div>
        </article>
    `).join("");

    if (!urgentAlerts.length) {
        elements.alertsList.innerHTML = `
            <article class="alert-card">
                <p class="alert-message">No high severity alerts are currently active.</p>
            </article>
        `;
    }
}

function renderReports() {
    renderStatGrid(elements.reportStats, reportCards());
    elements.reportsTableBody.innerHTML = tableRows(appState.logs, true);
}

function navigateTo(view) {
    appState.activeView = view;
    elements.navItems.forEach(item => {
        item.classList.toggle("active", item.dataset.view === view);
    });
    elements.views.forEach(section => {
        section.classList.toggle("active", section.id === `view-${view}`);
    });
}

function syncSidebarState() {
    elements.shellGrid.classList.toggle("sidebar-collapsed", appState.isSidebarCollapsed);
    elements.sidebarToggle.setAttribute("aria-expanded", String(!appState.isSidebarCollapsed));
    elements.sidebarToggle.setAttribute(
        "aria-label",
        appState.isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
    );
}

function exportReportsCsv() {
    const header = ["User ID", "Username", "Login time", "Status", "IP Address", "Risk Level"];
    const rows = appState.logs.map(row => [
        row.userId,
        row.username,
        row.loginTime,
        row.status,
        row.ip,
        row.status === "Success" ? "LOW" : "HIGH"
    ]);

    const csvLines = [header, ...rows].map(columns =>
        columns.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")
    );

    const blob = new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "cyberwatch-reports.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
}

function createToast(title, message, isError = false) {
    const toast = document.createElement("div");
    toast.className = `toast${isError ? " error" : ""}`;
    toast.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
    elements.toastStack.appendChild(toast);
    window.setTimeout(() => {
        toast.remove();
    }, 3200);
}

function attachEvents() {
    elements.loginForm.addEventListener("submit", event => {
        event.preventDefault();
        elements.loginScreen.classList.add("hidden");
        elements.appShell.classList.remove("hidden");
        navigateTo("dashboard");
        createToast("Login successful", "CyberWatch console ready.");
    });

    elements.navItems.forEach(item => {
        item.addEventListener("click", () => navigateTo(item.dataset.view));
    });

    elements.routeButtons.forEach(button => {
        button.addEventListener("click", () => navigateTo(button.dataset.viewTarget));
    });

    elements.sidebarToggle.addEventListener("click", () => {
        appState.isSidebarCollapsed = !appState.isSidebarCollapsed;
        syncSidebarState();
    });

    elements.logsSearch.addEventListener("input", renderLogs);

    elements.filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            appState.logFilter = button.dataset.filter;
            elements.filterButtons.forEach(item => item.classList.toggle("active", item === button));
            renderLogs();
        });
    });

    elements.refreshDashboardBtn.addEventListener("click", () => {
        renderDashboard();
        createToast("Dashboard updated", "Latest authentication activity loaded.");
    });

    elements.refreshLogsBtn.addEventListener("click", () => {
        renderLogs();
        createToast("Table refreshed", "Log entries are up to date.");
    });

    elements.detectBtn.addEventListener("click", () => {
        createToast("Scan complete", "No new high severity activity detected.");
    });

    elements.clearAlertsBtn.addEventListener("click", () => {
        appState.alerts = appState.alerts.filter(alert => alert.level !== "HIGH");
        renderAlerts();
        renderReports();
        renderDashboard();
        createToast("Alerts cleared", "High severity alerts were dismissed until the page reloads.");
    });

    elements.exportBtn.addEventListener("click", () => {
        exportReportsCsv();
        createToast("Export complete", "The reports CSV was downloaded.");
    });

    elements.logoutBtn.addEventListener("click", () => {
        elements.appShell.classList.add("hidden");
        elements.loginScreen.classList.remove("hidden");
        navigateTo("dashboard");
        createToast("Signed out", "You have been logged out.");
    });
}

function initialize() {
    renderDashboard();
    renderLogs();
    renderAlerts();
    renderReports();
    syncSidebarState();
    attachEvents();
}

initialize();
