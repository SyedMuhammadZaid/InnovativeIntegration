export const ParentLayerProjectsMapping: any = {
    "1": "Cybersecurity & Network Security Projects",
    "2": "Backup and Recovery Projects",
    "3": "Enterprise Storage Projects (NetApp)",
    "4": "Datacenter Projects",
    "5": "Local Traffic Load-Balancing",
    "6": "Global Server Load-Balancing"
}

export const ParentLayerProjectsMappingDescription: any = {
    "1": "Projects focused on protecting networks, systems, and data from cyber threats. Includes firewalls, intrusion detection/prevention systems, VPNs, endpoint protection, and security audits.",

    "2": "Projects designed to ensure data availability by implementing backups, disaster recovery strategies, and business continuity solutions for critical systems.",

    "3": "Implementation and management of enterprise-grade storage solutions using NetApp technologies for high availability, scalability, and efficient data management.",

    "4": "Projects related to planning, building, upgrading, and maintaining data center infrastructure including servers, storage, networking, power, and cooling systems.",

    "5": "Solutions that distribute incoming network traffic across multiple local servers to improve performance, availability, and reliability within a single data center or location.",

    "6": "Advanced load balancing solutions that route traffic across geographically distributed servers to enhance global availability, reduce latency, and provide high fault tolerance."
};

// open the local one when working locally else the prod one.
export const AdminPanelUrl = "https://admin-panel-production-62fb.up.railway.app"
// export const AdminPanelUrl = "http://localhost:3000"