-- Crear tabla de roles de usuario
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice único para user_id
CREATE UNIQUE INDEX IF NOT EXISTS user_roles_user_id_idx ON user_roles (user_id);

-- Crear tabla de configuración de precios
CREATE TABLE IF NOT EXISTS price_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice único para item_id
CREATE UNIQUE INDEX IF NOT EXISTS price_settings_item_id_idx ON price_settings (item_id);

-- Habilitar RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_settings ENABLE ROW LEVEL SECURITY;

-- Políticas para user_roles
CREATE POLICY "Users can view their own role" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON user_roles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert roles" ON user_roles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

CREATE POLICY "Admins can update roles" ON user_roles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

-- Políticas para price_settings
CREATE POLICY "Everyone can view prices" ON price_settings
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage prices" ON price_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

-- Insertar usuario admin por defecto (reemplaza con tu email)
INSERT INTO user_roles (user_id, role) 
SELECT id, 'admin' 
FROM auth.users 
WHERE email = 'admin@lascosascomoson.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
