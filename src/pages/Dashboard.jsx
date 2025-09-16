import React from "react"
import { Layout, Card, Typography, Button, Space, Descriptions, Tag, Divider, message } from "antd"
import { DashboardOutlined, LogoutOutlined, KeyOutlined, UserOutlined, CopyOutlined } from "@ant-design/icons"
import { getAuth, getConfigKey, signOut, hasValidConfigKey } from "../lib/auth"
import { useNavigate } from "react-router-dom"

const { Header, Content } = Layout
const { Title, Text, Paragraph } = Typography

export default function Dashboard() {
  const navigate = useNavigate()
  const auth = getAuth()
  const configKey = getConfigKey()
  
  // Debug logging
  console.log("Dashboard mounted - auth:", auth)
  console.log("Dashboard mounted - configKey length:", configKey ? configKey.length : "null")
  console.log("Dashboard mounted - hasValidConfigKey:", hasValidConfigKey())

  const handleSignOut = () => {
    signOut()
    navigate("/auth")
  }

  const handleCopy = async () => {
    try {
      if (!configKey) {
        message.warning("No configuration key to copy")
        return
      }
      await navigator.clipboard.writeText(configKey)
      message.success("Configuration key copied to clipboard!")
    } catch {
      message.error("Failed to copy key")
    }
  }

  const formatKeyPreview = (key) => {
    if (!key) return "No configuration key found"
    if (key.length <= 200) return key
    return key.substring(0, 200) + "... [truncated]"
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: "0 50px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Space>
          <DashboardOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
          <Title level={3} style={{ margin: 0, color: "#1890ff" }}>Dashboard</Title>
        </Space>
        <Space>
          <Space>
            <UserOutlined />
            <Text strong>{auth?.email || "user"}</Text>
          </Space>
          <Button 
            type="primary" 
            danger 
            icon={<LogoutOutlined />} 
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Space>
      </Header>
      
      <Content style={{ padding: "24px", background: "#f0f2f5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Welcome Section */}
          <Card style={{ marginBottom: 24 }}>
            <Space align="start" style={{ width: "100%" }}>
              <DashboardOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
              <div style={{ flex: 1 }}>
                <Title level={2} style={{ margin: 0 }}>Welcome to StackGuard Dashboard</Title>
                <Paragraph style={{ color: "rgba(0,0,0,0.45)" }}>
                  This is your secure dashboard. You have successfully authenticated and provided a valid configuration key.
                </Paragraph>
              </div>
            </Space>
          </Card>

          {/* User Information */}
          <Card title="User Information" style={{ marginBottom: 24 }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Email Address">
                <Space>
                  <UserOutlined />
                  <Text strong>{auth?.email || "Not available"}</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Authentication Status">
                <Tag color="success">Authenticated</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Configuration Status">
                {hasValidConfigKey() 
                  ? <Tag color="success">Valid Configuration Key</Tag>
                  : <Tag color="error">Invalid or Missing Key</Tag>}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Configuration Key Preview */}
          <Card 
            title={
              <Space>
                <KeyOutlined />
                Configuration Key Preview
              </Space>
            } 
            style={{ marginBottom: 24 }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text strong>Key Length:</Text> {configKey?.length || 0} characters
              </div>
              <div>
                <Text strong>Key Preview:</Text>
              </div>
              <Card 
                size="small" 
                style={{ 
                  backgroundColor: "#f5f5f5", 
                  fontFamily: "monospace", 
                  fontSize: "12px",
                  maxHeight: "200px",
                  overflow: "auto"
                }}
              >
                <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                  {formatKeyPreview(configKey)}
                </pre>
              </Card>
              <Space>
                <Button icon={<CopyOutlined />} onClick={handleCopy} disabled={!configKey}>
                  Copy Key
                </Button>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {configKey && configKey.length > 200 ? "Showing first 200 characters..." : "Full key displayed"}
                </Text>
              </Space>
            </Space>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <Space wrap>
              <Button 
                type="primary" 
                icon={<KeyOutlined />}
                onClick={() => navigate("/config")}
              >
                Update Configuration Key
              </Button>
              <Button 
                icon={<LogoutOutlined />}
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </Space>
          </Card>

          <Divider />
          
          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Text type="secondary">
              StackGuard Dashboard - Protected Area | This page is only accessible with valid authentication and configuration
            </Text>
          </div>
        </div>
      </Content>
    </Layout>
  )
}
