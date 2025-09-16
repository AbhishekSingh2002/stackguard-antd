import React, { useState } from "react"
import { Layout, Form, Input, Button, Tabs, message, Card, Row, Col } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { signIn, signUp } from "../lib/auth"
import { useNavigate } from "react-router-dom"

const { Header, Content } = Layout

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async (values, isSignUp) => {
    setLoading(true)
    try {
      // Defensive: support both sync and async implementations of signIn/signUp
      let result
      if (isSignUp) {
        // Use the correct signature that matches auth.js: { name, email, password }
        result = await signUp({ name: values.name, email: values.email, password: values.password })
      } else {
        result = await signIn({ email: values.email, password: values.password })
      }

      if (result && result.ok) {
        message.success(isSignUp ? "Account created successfully!" : "Signed in successfully!")
        // replace true so that user doesn't go back to auth with back button
        navigate("/config", { replace: true })
      } else {
        // show API message if present, fallback to generic
        message.error((result && result.message) || "Authentication failed")
      }
    } catch (error) {
      console.error("Auth error:", error)
      message.error("An error occurred during authentication")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: "0 50px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h1 style={{ margin: 0, color: "#1890ff" }}>StackGuard</h1>
      </Header>
      <Content style={{ padding: "50px", background: "#f0f2f5" }}>
        <Row justify="center" align="middle" style={{ minHeight: "calc(100vh - 64px)" }}>
          <Col xs={22} sm={18} md={12} lg={10} xl={8}>
            <Card style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <h2>Welcome to StackGuard</h2>
                <p style={{ color: "#666" }}>Sign in or create an account to continue</p>
              </div>

              <Tabs
                defaultActiveKey="signin"
                centered
                items={[
                  {
                    key: 'signin',
                    label: 'Sign In',
                    children: (
                      <Form
                        name="signin"
                        onFinish={(values) => handleAuth(values, false)}
                        autoComplete="off"
                        layout="vertical"
                      >
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
                        >
                          <Input prefix={<UserOutlined />} placeholder="you@example.com" />
                        </Form.Item>

                        <Form.Item
                          name="password"
                          label="Password"
                          rules={[{ required: true, min: 6, message: "Password must be at least 6 characters!" }]}
                        >
                          <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
                        </Form.Item>

                        <Form.Item>
                          <Button type="primary" htmlType="submit" loading={loading} block>
                            Sign In
                          </Button>
                        </Form.Item>
                      </Form>
                    ),
                  },
                  {
                    key: 'signup',
                    label: 'Sign Up',
                    children: (
                      <Form
                        name="signup"
                        onFinish={(values) => handleAuth(values, true)}
                        autoComplete="off"
                        layout="vertical"
                      >
                        <Form.Item
                          name="name"
                          label="Full Name"
                          rules={[{ required: true, message: "Please enter your full name!" }]}
                        >
                          <Input prefix={<UserOutlined />} placeholder="Your full name" />
                        </Form.Item>

                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
                        >
                          <Input prefix={<UserOutlined />} placeholder="you@example.com" />
                        </Form.Item>

                        <Form.Item
                          name="password"
                          label="Password"
                          rules={[{ required: true, min: 6, message: "Password must be at least 6 characters!" }]}
                          hasFeedback
                        >
                          <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
                        </Form.Item>

                        <Form.Item
                          name="confirm"
                          label="Confirm Password"
                          dependencies={['password']}
                          hasFeedback
                          rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve()
                                }
                                return Promise.reject(new Error('Passwords do not match!'))
                              }
                            })
                          ]}
                        >
                          <Input.Password prefix={<LockOutlined />} placeholder="Re-enter password" />
                        </Form.Item>

                        <Form.Item>
                          <Button type="primary" htmlType="submit" loading={loading} block>
                            Sign Up
                          </Button>
                        </Form.Item>
                      </Form>
                    ),
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
