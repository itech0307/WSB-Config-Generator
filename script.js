document.getElementById("configForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const sandboxName = document.getElementById("sandboxName").value;
  const networkEnabled = document.getElementById("networkEnabled").checked;
  const vGPU = document.getElementById("vGPU").checked;
  const appsToInstall = document.getElementById("appsToInstall").value.split(',');

  const config = {
    Name: sandboxName,
    Network: networkEnabled ? "Enabled" : "Disabled",
    vGPU: vGPU ? "Enabled" : "Disabled",
    Apps: appsToInstall
  };

  const configXML = generateWSBConfig(config);

  // Tạo file cấu hình
  const blob = new Blob([configXML], { type: "text/xml" });
  const downloadLink = document.getElementById("downloadLink");
  downloadLink.href = URL.createObjectURL(blob);
  document.getElementById("downloadSection").classList.remove("hidden");
});

function generateWSBConfig(config) {
  return `<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <Name>${config.Name}</Name>
  <Networking>${config.Network}</Networking>
  <vGPU>${config.vGPU}</vGPU>
  <Applications>
    ${config.Apps.map(app => `<App>${app.trim()}</App>`).join("\n")}
  </Applications>
</Configuration>`;
}
