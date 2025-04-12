
const _print = (command: any) => `:put [${command} as-value detail] `
const _params = (obj: any) => Object.entries(obj)
    .map(([key, value]: any) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join(' ');

const findPairByKey = (array: string | any[], key: string | number) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i]?.hasOwnProperty(key)) {
            return array[i][key];
        }
    }
    return undefined; // Key not found in any object
}


const commands = {

    interface: [
        { list: _print('/interface print') },
        {
            eoip: {
                list: _print('/interface eoip print'),
                /**
                 * @param 'name' 
                 * @param 'local-address'
                 * @param 'remote-address'
                 * @param 'tunnel-id'
                 */
                add: (params: any) => `/interface eoip add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface eoip set  set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface eoip remove ${name}`,
            }
        },
        {
            ipip: {
                list: _print('/interface ipip print'),
                /**
                 * @param 'name' 
                 * @param 'local-address'
                 * @param 'remote-address'
                 */
                add: (params: any) => `/interface ipip add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface ipip set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface ipip remove ${name}`,
            }
        },
        {
            gre: {
                list: _print('/interface gre print'),
                /**
                 * @param 'name' 
                 * @param 'local-address'
                 * @param 'remote-address'
                 */
                add: (params: any) => `/interface gre add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface gre set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface gre remove ${name}`,
            }
        },
        {
            vlan: {
                list: _print('/interface vlan print'),
                /**
                 * @param 'name' 
                 * @param 'vlan-id'
                 * @param 'interface'
                 */
                add: (params: any) => `/interface vlan add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface vlan set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface vlan remove ${name}`,
            }
        },
        {
            vrrp: {
                list: _print('/interface vrrp print'),
                /**
                 * @param 'name' 
                 * @param 'interface'
                 * @param 'vrid'
                 * @param 'priority'
                 */
                add: (params: any) => `/interface vrrp add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface vrrp set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface vrrp remove ${name}`,
            }
        },
        {
            bonding: {
                list: _print('/interface bonding print'),
                /**
                 * @param 'name' 
                 * @param 'slaves'
                 * @param 'mode'
                 */
                add: (params: any) => `/interface bonding add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface bonding set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface bonding remove ${name}`,
            }
        },
        {
            bridge: {
                list: _print('/interface bridge print'),
                /**
                 * @param 'name' 
                 */
                add: (params: any) => `/interface bridge add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface bridge set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface bridge remove ${name}`,
                port: {
                    /**
                     * @param 'bridge'
                     * @param 'interface'
                    */
                    list: _print('/interface bridge port print'),
                    add: (params: any) => `/interface bridge port add ${_params(params)}`,
                    set: (name: string, params: any) => `/interface bridge port set [find ${name}] ${_params(params)}`,
                    remove: (name: string) => `/interface bridge port remove [find ${name}]`
                }
            }
        },
        {
            mesh: {
                list: _print('/interface mesh print'),
                /**
                 * @param 'name' 
                 */
                add: (params: any) => `/interface mesh add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface mesh set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface mesh remove ${name}`,
                port: {
                    list: _print('/interface mesh port print'),
                    /**
                     * @param 'name'
                     */
                    add: (params: any) => `/interface mesh port add ${_params(params)}`,
                    /**
                     * @param 'name'
                     */
                    set: (name: string, params: any) => `/interface mesh port set [find ${name}] ${_params(params)}`,
                    remove: (name: string) => `/interface mesh port remove [find ${name}]`
                }
            }
        },
        {
            ppp_server: {
                list: _print('/interface ppp-server print'),
                /**
                 * @param 'name' 
                 */
                add: (params: any) => `/interface ppp-server add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface ppp-server set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface ppp-server remove ${name}`,
            }
        },
        {
            ppp_client: {
                list: _print('/interface ppp-client print'),
                /**
                 * @param 'name' 
                 * @param 'connect-to'
                 * @param 'user'
                 * @param 'password'
                 */
                add: (params: any) => `/interface ppp-client add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface ppp-client set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface ppp-client remove ${name}`,
            }
        },
        {
            pptp_server: {
                list: _print('/interface pptp-server print'),
                /**
                 * @param 'name' 
                 */
                add: (params: any) => `/interface pptp-server add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface pptp-server set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface pptp-server remove ${name}`,
            }
        },
        {
            pptp_client: {
                list: _print('/interface pptp-client print'),
                /**
                 * @param 'name' 
                 * @param 'connect-to'
                 * @param 'user'
                 * @param 'password'
                 */
                add: (params: any) => `/interface pptp-client add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface pptp-client set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface pptp-client remove ${name}`,
            }
        },
        {
            sstp_server: {
                list: _print('/interface sstp-server print'),
                /**
                 * @param 'name' 
                 */
                add: (params: any) => `/interface sstp-server add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface sstp-server set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface sstp-server remove ${name}`,
            }
        },
        {
            l2tp_server: {
                list: _print('/interface l2tp-server print'),
                /**
                 * @param 'name' 
                 */
                add: (params: any) => `/interface l2tp-server add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface l2tp-server set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface l2tp-server remove ${name}`,
            }
        },
        {
            l2tp_client: {
                list: _print('/interface l2tp-client print'),
                /**
                 * @param 'name' 
                 * @param 'connect-to'
                 * @param 'user'
                 * @param 'password'
                 */
                add: (params: any) => `/interface l2tp-client add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface l2tp-client set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface l2tp-client remove ${name}`,
            }
        },

        {
            ovpn_server: {
                list: _print('/interface ovpn-server print'),
                /**
                 * @param 'name' 
                 */
                add: (params: any) => `/interface ovpn-server add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface ovpn-server set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface ovpn-server remove ${name}`,
            }
        },

        {
            ovpn_client: {
                list: _print('/interface ovpn-client print'),
                /**
                 * @param 'name' 
                 * @param 'connect-to'
                 * @param 'user'
                 * @param 'password'
                 */
                add: (params: any) => `/interface ovpn-client add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface ovpn-client set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface ovpn-client remove ${name}`,
            }
        },

        {
            pppoe_server: {
                list: _print('/interface pppoe-server print'),
                /**
                 * @param 'name' 
                 */
                add: (params: any) => `/interface pppoe-server add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface pppoe-server set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface pppoe-server remove ${name}`,
            }
        },
        {
            pppoe_client: {
                list: _print('/interface pppoe-client print'),
                /**
                 * @param 'name' 
                 * @param 'interface'
                 * @param 'user'
                 * @param 'password'
                 */
                add: (params: any) => `/interface pppoe-client add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface pppoe-client set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface pppoe-client remove ${name}`,
            }
        },

        {
            vpls: {
                list: _print('/interface vpls print'),
                /**
                 * @param 'name' 
                 * @param 'remote-peer'
                 */
                add: (params: any) => `/interface vpls add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface vpls set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface vpls remove ${name}`,
            }
        },

        {
            traffic_eng: {
                list: _print('/interface traffic-eng print'),
                /**
                 * @param 'name' 
                 * @param 'interface'
                 */
                add: (params: any) => `/interface traffic-eng add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface traffic-eng set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface traffic-eng remove ${name}`,
            }
        },
        {
            virtual: {
                list: _print('/interface virtual print'),
                /**
                 * @param 'name' 
                 */
                add: (params: any) => `/interface virtual add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface virtual set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface virtual remove ${name}`,
            }
        },

        {
            wds: {
                list: _print('/interface wireless wds print'),
                /**
                 * @param 'name' 
                 * @param 'master-interface'
                 */
                add: (params: any) => `/interface wireless wds add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface wireless wds set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface wireless wds remove ${name}`,
            }
        },

        {
            nstreme_dual: {
                list: _print('/interface nstreme-dual print'),
                /**
                 * @param 'name' 
                 * @param 'tx-radio'
                 * @param 'rx-radio'
                 */
                add: (params: any) => `/interface nstreme-dual add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface nstreme-dual set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface nstreme-dual remove ${name}`,
            }
        },

        {
            w60g: {
                list: _print('/interface w60g print'),
                /**
                 * @param 'name' 
                 * @param 'mode'
                 */
                add: (params: any) => `/interface w60g add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface w60g set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface w60g remove ${name}`,
            }
        },
        {
            wireless_cap: {
                list: _print('/interface wireless cap print'),
                /**
                 * @param 'name' 
                 * @param 'interfaces'
                 */
                add: (params: any) => `/interface wireless cap add ${_params(params)}`,
                /**
                 * @param 'enabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/interface wireless cap set ${name} ${_params(params)}`,
                remove: (name: any) => `/interface wireless cap remove ${name}`,
            }
        },
    ],
    ip: [
        {
            ip_address: {
                list: _print('/ip address print'),
                /**
                 * @param 'address' 
                 * @param 'interface'
                 */
                add: (params: any) => `/ip address add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'address'
                 */
                set: (name: string, params: any) => `/ip address set [find ${name}] ${_params(params)}`,
                remove: (name: string) => `/ip address remove [find ${name}]`,
            },
        },
        {
            ip_neighbor: {
                list: _print('/ip neighbor print'),
                /**
                 * @param 'discover-interface-list'
                 */
                discoverySettings: {
                    set: (params: any) => `/ip neighbor discovery-settings set ${_params(params)}`,
                },
            },
        },
        {
            ip_cloud: {
                /**
                 * @param 'ddns-enabled'
                 */
                set: (params: any) => `/ip cloud set ${_params(params)}`,
                list: _print('/ip cloud print'),
                forceUpdate: () => `/ip cloud force-update`,
            },
        },
        {
            ip_dns: {
                /**
                 * @param 'servers'
                 */
                set: (params: any) => `/ip dns set ${_params(params)}`,
                list: _print('/ip dns print'),
                static: {
                    /**
                     * @param 'name'
                     * @param 'address'
                     */
                    add: (params: any) => `/ip dns static add ${_params(params)}`,
                    list: _print('/ip dns static print'),
                    remove: (name: string) => `/ip dns static remove [find ${name}]`,
                },
            },
        },
        {
            ip_firewall_filter: {
                list: _print('/ip firewall filter print'),
                /**
                 * @param 'chain'
                 * @param 'protocol'
                 * @param 'dst-port'
                 * @param 'action'
                 */
                add: (params: any) => `/ip firewall filter add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'chain'
                 */
                set: (name: string, params: any) => `/ip firewall filter set [find ${name}] ${_params(params)}`,
                remove: (name: string) => `/ip firewall filter remove [find ${name}]`,
            },
        },
        {
            ip_firewall_nat: {
                list: _print('/ip firewall nat print'),
                /**
                 * @param 'chain'
                 * @param 'out-interface'
                 * @param 'action'
                 */
                add: (params: any) => `/ip firewall nat add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'chain'
                 */
                set: (name: string, params: any) => `/ip firewall nat set [find ${name}] ${_params(params)}`,
                remove: (name: string) => `/ip firewall nat remove [find ${name}]`,
            },
        },
        {
            ip_firewall_mangle: {
                list: _print('/ip firewall mangle print'),
                /**
                 * @param 'chain'
                 * @param 'action'
                 * @param 'parameters'
                 */
                add: (params: any) => `/ip firewall mangle add ${_params(params)}`,
                /**
                 * @param 'parameters'
                 */
                remove: (name: string) => `/ip firewall mangle remove [find ${name}]`,
                /**
                 * @param 'parameters'
                 * @param 'disabled'
                 */
                set: (name: string, params: any) => `/ip firewall mangle set [find ${name}] ${_params(params)}`,
            },
        },
        {
            ip_hotspot: {
                list: _print('/ip hotspot print'),
                /**
                 * @param 'name'
                 * @param 'interface'
                 * @param 'address-pool'
                 * @param 'profile'
                 */
                add: (params: any) => `/ip hotspot add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/ip hotspot set ${name} ${_params(params)}`,
                remove: (name: any) => `/ip hotspot remove ${name}`,

            },
        },
        {
            ip_hotspot_profile: {
                list: _print('/ip hotspot profile print'),
                /**
                 * @param 'name'
                 * @param 'hotspot-address'
                 * @param 'html-directory'
                 */
                add: (params: any) => `/ip hotspot profile add ${_params(params)}`,
                /**
                 * @param 'dns-name'
                 * @param 'name'
                 */
                remove: (name: any) => `/ip hotspot profile remove ${name}`,
            }
        },

        {
            ip_hotspot_user: {
                list: _print('/ip hotspot user print'),
                /**
                 * @param 'name'
                 * @param 'password'
                 * @param 'profile'
                 */
                add: (params: any) => `/ip hotspot user add ${_params(params)}`,
                /**
                 * @param 'password'
                 * @param 'name'
                 */
                set: (name: string, params: any) => `/ip hotspot user set [find ${name}] ${_params(params)}`,
                remove: (name: string) => `/ip hotspot user remove [find ${name}]`,
            }
        },

        {
            ip_hotspot_user_profile: {
                list: _print('/ip hotspot user profile print'),
                /**
                 * @param 'name'
                 * @param 'rate-limit'
                 */
                add: (params: any) => `/ip hotspot user profile add ${_params(params)}`,
                /**
                 * @param 'rate-limit'
                 * @param 'name'
                 */
                remove: (name: string) => `/ip hotspot user profile remove [find ${name}]`,
            }
        },

        {
            ip_hotspot_active: {
                list: _print('/ip hotspot active print'),
                remove: (name: string) => `/ip hotspot active remove [find ${name}]`,
                printStats: _print('/ip hotspot active print stats'),
            }
        },

        {
            ip_hotspot_host: {
                list: _print('/ip hotspot host print'),
                remove: (name: string) => `/ip hotspot host remove [find ${name}]`,
                printDetail: _print('/ip hotspot host print detail'),
            }
        },

        {
            ip_hotspot_ipbinding: {
                list: _print('/ip hotspot ip-binding print'),
                /**
                 * @param 'mac-address'
                 * @param 'type'
                 */
                add: (params: any) => `/ip hotspot ip-binding add ${_params(params)}`,
                /**
                 * @param 'type'
                 * @param 'mac-address'
                 */
                set: (name: string, params: any) => `/ip hotspot ip-binding set [find ${name}] ${_params(params)}`,
                remove: (name: string) => `/ip hotspot ip-binding remove [find ${name}]`,
            }
        },

        {
            ip_hotspot_walled_garden: {
                list: _print('/ip hotspot walled-garden print'),
                /**
                 * @param 'dst-host'
                 */
                add: (params: any) => `/ip hotspot walled-garden add ${_params(params)}`,
                /**
                 * @param 'action'
                 * @param 'dst-host'
                 */
                set: (name: string, params: any) => `/ip hotspot walled-garden set [find ${name}] ${_params(params)}`,
                remove: (name: string) => `/ip hotspot walled-garden remove [find ${name}]`,
                ip: {
                    list: _print('/ip hotspot walled-garden ip print'),
                    /**
                     * @param 'dst-address'
                     */
                    add: (params: any) => `/ip hotspot walled-garden ip add ${_params(params)}`,
                    /**
                     * @param 'action'
                     * @param 'dst-address'
                     */
                    set: (name: string, params: any) => `/ip hotspot walled-garden ip set [find ${name}] ${_params(params)}`,
                    remove: (name: string) => `/ip hotspot walled-garden ip remove [find ${name}]`,
                },
            }
        },

        {
            ip_hotspot_cookie: {
                list: _print('/ip hotspot cookie print'),
                remove: (name: string) => `/ip hotspot cookie remove [find ${name}]`,
                printDetail: _print('/ip hotspot cookie print detail'),
            }
        },
        {
            ip_dhcp_client: {
                list: _print('/ip dhcp-client print'),
                /**
                 * @param 'interface'
                 * @param 'disabled'
                 */
                add: (params: any) => `/ip dhcp-client add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'interface'
                 */
                set: (name: string, params: any) => `/ip dhcp-client set [find ${name}] ${_params(params)}`,
                remove: (name: string) => `/ip dhcp-client remove [find ${name}]`,
            },
        },
        {
            ip_dhcp_server: {
                list: _print('/ip dhcp-server print'),
                /**
                 * @param 'name'
                 * @param 'interface'
                 * @param 'address-pool'
                 * @param 'lease-time'
                 */
                add: (params: any) => `/ip dhcp-server add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'name'
                 */
                set: (name: any, params: any) => `/ip dhcp-server set ${name} ${_params(params)}`,
                remove: (name: any) => `/ip dhcp-server remove ${name}`,
                lease: {
                    list: _print('/ip dhcp-server lease print'),
                    /**
                     * @param 'address'
                     * @param 'mac-address'
                     */
                    add: (params: any) => `/ip dhcp-server lease add ${_params(params)}`,
                    /**
                     * @param 'disabled'
                     * @param 'address'
                     */
                    set: (name: string, params: any) => `/ip dhcp-server lease set [find ${name}] ${_params(params)}`,
                    remove: (name: string) => `/ip dhcp-server lease remove [find ${name}]`,
                },
            },
        },
        {
            ipv6_dhcp_client: {
                list: _print('/ipv6 dhcp-client print'),
                /**
                 * @param 'interface'
                 * @param 'pool-name'
                 * @param 'add-default-route'
                 */
                add: (params: any) => `/ipv6 dhcp-client add ${_params(params)}`,
                /**
                 * @param 'disabled'
                 * @param 'interface'
                 */
                set: (name: string, params: any) => `/ipv6 dhcp-client set [find ${name}] ${_params(params)}`,
                remove: (name: string) => `/ipv6 dhcp-client remove [find ${name}]`,
            },
        },



    ]

}
export default class CommandUtils {
    static getResources(resource: any, option: string, action: string) {
        let command: any = {}
        switch (resource) {
            case 'interface':
                command = findPairByKey(commands.interface, option)
                break;
            case 'ip':
                command = findPairByKey(commands.ip, option)
                break;
            default:
                break;
        }
        return option == 'list' ? command : command[action]
    }
    static manageResources(resource: any, option: string, action: string, payload: { name: any, params: any }) {
        let command: any = {}
        switch (resource) {
            case 'interface':
                command = findPairByKey(commands.interface, option)
                break;
            case 'ip':
                command = findPairByKey(commands.ip, option)
                break;
            default:
                break;
        }
        return command[action](payload.name, payload.params)
    }
}

