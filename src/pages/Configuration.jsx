import React, { useState, useEffect } from "react"
import { Layout, Form, Input, Button, Card, Progress, message, Space, Typography, Row, Col } from "antd"
import { CopyOutlined, SaveOutlined } from "@ant-design/icons"
import { saveConfigKey, getConfigKey, signOut, getAuth } from "../lib/auth"
import { useNavigate } from "react-router-dom"

const { Header, Content } = Layout
const { Title, Text } = Typography

export default function Configuration() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const initialKey = getConfigKey() || ""
  const navigate = useNavigate()
  const auth = getAuth()
  const [isFormReady, setIsFormReady] = useState(false)
  const [currentKey, setCurrentKey] = useState(initialKey)
  
  // Debug: log what's in localStorage on mount
  console.log("Configuration - Component mounted")
  console.log("Configuration - initialKey from localStorage:", initialKey)
  console.log("Configuration - initialKey length:", initialKey.length)

  // Initialize form values when component mounts and form is ready
  useEffect(() => {
    if (isFormReady && initialKey) {
      console.log("Configuration - Initializing form values")
      console.log("Configuration - initialKey length:", initialKey.length)
      try {
        form.setFieldsValue({ configKey: initialKey })
        setCurrentKey(initialKey)
        console.log("Configuration - form value set successfully")
      } catch (error) {
        console.error("Configuration - error setting form value:", error)
      }
    }
  }, [initialKey, form, isFormReady])

  const validateKey = (key) => {
    return typeof key === "string" && key.length >= 100 && key.length <= 1000
  }

  const handleSave = async (values) => {
    const key = values.configKey || ""
    console.log("handleSave called with key length:", key.length)
    
    if (!validateKey(key)) {
      console.log("Validation failed for key length:", key.length)
      message.error("Configuration key must be between 100-1000 characters")
      return
    }

    setLoading(true)
    try {
      console.log("Saving config key...")
      const result = await saveConfigKey(key)
      console.log("Save result:", result)
      
      if (result) {
        message.success("Configuration saved successfully!")
        console.log("Navigating to dashboard...")
        navigate("/dashboard")
      } else {
        message.error("Failed to save configuration")
      }
    } catch (error) {
      console.error("Error saving config:", error)
      message.error("Error saving configuration")
    } finally {
      setLoading(false)
    }
  }

  const handleQuickFill = () => {
    const testKey = "test-configuration-key-" + "a".repeat(100) + "-end"
    if (form && form.setFieldsValue) {
      form.setFieldsValue({ configKey: testKey })
      setCurrentKey(testKey)
      message.success("Test key filled (120 characters)")
    }
  }

  const handleCopy = async () => {
    const key = form && form.getFieldValue ? form.getFieldValue("configKey") || "" : ""
    if (!key) {
      message.warning("No key to copy")
      return
    }

    try {
      await navigator.clipboard.writeText(key)
      message.success("Key copied to clipboard")
    } catch (error) {
      message.error("Unable to copy to clipboard")
    }
  }

  const handleSignOut = () => {
    signOut()
    navigate("/auth")
  }

  const handleKeyChange = (e) => {
    const value = e.target.value
    console.log("handleKeyChange called with value length:", value.length)
    setCurrentKey(value)
    
    // If user clears the field, also clear the form value to ensure consistency
    if (value === "") {
      form.setFieldsValue({ configKey: "" })
    }
  }

  const handleClearKey = () => {
    setCurrentKey("")
    form.setFieldsValue({ configKey: "" })
    // Also clear from localStorage
    try {
      localStorage.removeItem("stackguard_config_key_v1")
      console.log("Configuration key cleared from localStorage")
      message.success("Configuration key cleared")
    } catch (error) {
      console.error("Error clearing config key from localStorage:", error)
    }
  }

  // Get current key from form for UI display
  console.log("Render - currentKey length:", currentKey.length)
  const progress = Math.min(100, Math.round((currentKey.length / 1000) * 100))
  const isValid = validateKey(currentKey)

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: "0 50px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={3} style={{ margin: 0, color: "#1890ff" }}>Configuration</Title>
        <Space>
          <Text type="secondary">Signed in as: {auth?.email || "user"}</Text>
          <Button type="link" onClick={handleSignOut} danger>
            Sign Out
          </Button>
        </Space>
      </Header>

      <Content style={{ padding: "50px", background: "#f0f2f5" }}>
        <Row justify="center" align="middle" style={{ minHeight: "calc(100vh - 64px)" }}>
          <Col xs={24} sm={20} md={16} lg={12} xl={10}>
            <Card style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <Title level={2}>Enter Configuration Key</Title>
                <Text type="secondary">
                  Paste your configuration key to unlock the Dashboard. Key must be between 100-1000 characters.
                </Text>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                onReady={() => {
                  console.log("Configuration - Form is ready")
                  setIsFormReady(true)
                }}
              >
                  <Form.Item
                    name="configKey"
                    label="Configuration Key"
                    rules={[
                      { required: true, message: "Configuration key is required" },
                      { min: 100, message: "Key must be at least 100 characters" },
                      { max: 1000, message: "Key must not exceed 1000 characters" }
                    ]}
                  >
                    <Input.TextArea
                      rows={8}
                      placeholder="Paste your configuration key here..."
                      style={{ fontFamily: "monospace" }}
                      onChange={handleKeyChange}
                    />
                  </Form.Item>

                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <Text type="secondary">Key Length: {currentKey.length}/1000</Text>
                      <Text type={isValid ? "success" : "danger"}>
                        {isValid ? "Valid" : "Invalid"}
                      </Text>
                    </div>
                    <Progress 
                      percent={progress} 
                      showInfo={false} 
                      strokeColor={isValid ? "#52c41a" : "#ff4d4f"}
                    />
                  </div>

                  <Row gutter={16}>
                    <Col span={6}>
                      <Button 
                        onClick={handleQuickFill} 
                        block
                        style={{ marginBottom: 16 }}
                      >
                        Quick Fill
                      </Button>
                    </Col>
                    <Col span={6}>
                      <Button 
                        onClick={handleClearKey} 
                        block
                        danger
                        style={{ marginBottom: 16 }}
                      >
                        Clear
                      </Button>
                    </Col>
                    <Col span={6}>
                      <Button 
                        onClick={handleCopy} 
                        icon={<CopyOutlined />} 
                        block
                        style={{ marginBottom: 16 }}
                      >
                        Copy
                      </Button>
                    </Col>
                    <Col span={6}>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        icon={<SaveOutlined />} 
                        loading={loading}
                        block
                        style={{ marginBottom: 16 }}
                      >
                        Save & Continue
                      </Button>
                    </Col>
                  </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
