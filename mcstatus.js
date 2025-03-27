class MCServerStatus {
    constructor(serverAddress) {
        this.serverAddress = serverAddress;
        // 移除可能包含的端口号
        this.baseAddress = serverAddress.split(':')[0];
        this.statusUrl = `https://api.mcsrvstat.us/2/${this.baseAddress}`;
    }

    async getStatus() {
        try {
            const response = await fetch(this.statusUrl);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            return {
                online: data.online,
                version: data.version,
                players: {
                    online: data.players?.online || 0,
                    max: data.players?.max || 0
                },
                // API响应时间不再作为服务器延迟显示
                hostname: data.hostname || this.baseAddress,
                port: data.port || 25565
            };
        } catch (error) {
            console.error('Error fetching server status:', error);
            return {
                online: false,
                version: 'Unknown',
                players: { online: 0, max: 0 },
                hostname: this.baseAddress,
                port: 25565
            };
        }
    }

    async updateStatusDisplay() {
        const status = await this.getStatus();
        
        // 更新服务器状态
        const statusElem = document.getElementById('server-status');
        if (statusElem) {
            statusElem.textContent = status.online ? '在线' : '离线';
            statusElem.className = `server-status ${status.online ? 'online' : 'offline'}`;
        }

        // 更新版本信息
        const versionElem = document.getElementById('server-version');
        if (versionElem) {
            versionElem.textContent = status.version || 'Unknown';
        }

        // 更新玩家数量
        const playersElem = document.getElementById('online-players');
        if (playersElem) {
            playersElem.textContent = `${status.players.online}/${status.players.max}`;
        }

        // 更新API延迟提示
        const pingElem = document.getElementById('server-ping');
        if (pingElem) {
            pingElem.textContent = status.online ? '已连接' : '--';
            pingElem.className = 'server-ping';
        }

        // 更新地址显示
        const addressElements = document.getElementsByClassName('server-address');
        for (const elem of addressElements) {
            elem.textContent = this.serverAddress;
        }
    }

    startAutoUpdate(interval = 30000) {
        this.updateStatusDisplay();
        setInterval(() => this.updateStatusDisplay(), interval);
    }
}