import React, { useState } from 'react';
import axios from 'axios';

const RegistrationDebugger: React.FC = () => {
  const [debugResults, setDebugResults] = useState<string[]>([]);
  const [isDebugging, setIsDebugging] = useState(false);

  const addResult = (message: string) => {
    setDebugResults(prev => [...prev, message]);
  };

  const clearResults = () => {
    setDebugResults([]);
  };

  const runDebugTest = async () => {
    setIsDebugging(true);
    clearResults();

    addResult('🔍 بدء اختبار التشخيص...');

    // 1. فحص Environment Variables
    addResult('\n1️⃣ فحص Environment Variables:');
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
    const apiKey = process.env.NEXT_PUBLIC_MEDUSA_API_KEY;
    
    addResult(`Backend URL: ${backendUrl || '❌ غير محدد'}`);
    addResult(`API Key: ${apiKey ? '✅ موجود' : '❌ غير محدد'}`);

    if (!backendUrl || !apiKey) {
      addResult('🚨 مطلوب إضافة environment variables في .env.local');
      setIsDebugging(false);
      return;
    }

    // 2. اختبار الاتصال بـ Medusa
    addResult('\n2️⃣ اختبار الاتصال بـ Medusa:');
    try {
      const healthResponse = await axios.get(`${backendUrl}/health`, { timeout: 5000 });
      addResult(`✅ Medusa يعمل - Status: ${healthResponse.status}`);
    } catch (error: any) {
      addResult('❌ Medusa لا يعمل!');
      addResult(`خطأ: ${error.message}`);
      setIsDebugging(false);
      return;
    }

    // 3. اختبار Store API
    addResult('\n3️⃣ اختبار Store API:');
    try {
      const storeResponse = await axios.get(`${backendUrl}/store`, {
        headers: {
          'x-publishable-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      });
      addResult('✅ Store API يعمل');
      addResult(`Store: ${storeResponse.data.store?.name || 'غير محدد'}`);
    } catch (error: any) {
      addResult('❌ Store API لا يعمل');
      addResult(`خطأ: ${error.response?.data?.message || error.message}`);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        addResult('💡 مشكلة في API Key - جرب npm run create-api-key');
      }
    }

    // 4. اختبار Registration API
    addResult('\n4️⃣ اختبار Registration API:');
    const testData = {
      first_name: 'Test',
      last_name: 'Debug',
      email: `test-debug-${Date.now()}@example.com`,
      password: 'password123'
    };

    try {
      addResult(`محاولة إنشاء عميل: ${testData.email}`);
      
      const registrationResponse = await axios.post(`${backendUrl}/store/customers`, testData, {
        headers: {
          'x-publishable-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      addResult('✅ Registration API يعمل!');
      addResult(`Customer ID: ${registrationResponse.data.customer?.id}`);
      addResult('🎉 جميع الاختبارات نجحت - المشكلة في الكود Frontend');

    } catch (error: any) {
      addResult('❌ Registration API فشل');
      addResult(`Status: ${error.response?.status}`);
      addResult(`Error: ${error.response?.data?.message || error.message}`);
      
      if (error.response?.status === 422) {
        addResult('💡 مشكلة validation - تحقق من البيانات المرسلة');
      } else if (error.response?.status === 409) {
        addResult('💡 البريد مستخدم مسبقاً - هذا طبيعي في الاختبار');
      }
    }

    // 5. معلومات إضافية
    addResult('\n5️⃣ معلومات إضافية:');
    addResult(`User Agent: ${navigator.userAgent}`);
    addResult(`Current URL: ${window.location.href}`);
    addResult(`Local Storage: ${localStorage.length} items`);

    setIsDebugging(false);
  };

  const testDirectRegistration = async () => {
    addResult('\n🧪 اختبار التسجيل المباشر...');
    
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
    const apiKey = process.env.NEXT_PUBLIC_MEDUSA_API_KEY;
    
    if (!backendUrl || !apiKey) {
      addResult('❌ Environment variables غير متوفرة');
      return;
    }

    try {
      // محاولة نفس الطريقة المستخدمة في AuthContext
      const testUser = {
        first_name: 'Direct',
        last_name: 'Test',
        email: `direct-test-${Date.now()}@example.com`,
        password: 'password123'
      };

      addResult(`📤 إرسال request إلى: ${backendUrl}/store/customers`);
      addResult(`📋 البيانات: ${JSON.stringify(testUser, null, 2)}`);

      const response = await axios.post(`${backendUrl}/store/customers`, testUser, {
        headers: {
          'x-publishable-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      });

      addResult('✅ Direct registration نجح!');
      addResult(`Response: ${JSON.stringify(response.data, null, 2)}`);

    } catch (error: any) {
      addResult('❌ Direct registration فشل');
      addResult(`Full error: ${JSON.stringify(error.response?.data || error.message, null, 2)}`);
    }
  };

  const styles = {
    container: {
      position: 'fixed' as const,
      top: '10px',
      right: '10px',
      width: '400px',
      maxHeight: '80vh',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      border: '1px solid #333',
      borderRadius: '8px',
      zIndex: 9999,
      fontFamily: 'monospace',
      fontSize: '12px'
    },
    header: {
      padding: '10px',
      backgroundColor: '#333',
      borderBottom: '1px solid #555',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    content: {
      padding: '10px',
      maxHeight: '400px',
      overflowY: 'auto' as const
    },
    button: {
      padding: '5px 10px',
      margin: '2px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '11px'
    },
    clearButton: {
      padding: '5px 10px',
      margin: '2px',
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '11px'
    },
    result: {
      whiteSpace: 'pre-wrap' as const,
      lineHeight: '1.4',
      marginBottom: '5px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <strong>🔧 Registration Debugger</strong>
      </div>
      <div style={styles.content}>
        <div style={{ marginBottom: '10px' }}>
          <button 
            style={styles.button} 
            onClick={runDebugTest}
            disabled={isDebugging}
          >
            {isDebugging ? '⏳ جاري الاختبار...' : '🔍 اختبار شامل'}
          </button>
          <button 
            style={styles.button} 
            onClick={testDirectRegistration}
            disabled={isDebugging}
          >
            🧪 اختبار مباشر
          </button>
          <button 
            style={styles.clearButton} 
            onClick={clearResults}
          >
            🧹 مسح
          </button>
        </div>
        
        <div style={styles.result}>
          {debugResults.map((result, index) => (
            <div key={index}>{result}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationDebugger;