import Foundation
import MMKV

class MMKVHelper {
    static let shared = MMKVHelper()
    private let mmkv: MMKV?
    
    private init() {
        // Initialize MMKV with App Group
        MMKV.initialize(rootDir: nil, groupDir: "group.com.guerra.WaterCounter", logLevel: .none)
        mmkv = MMKV(mmapID: "mmkv.default", mode: .multiProcess)
    }
    
    func dateKey(_ date: Date = Date()) -> String {
        let calendar = Calendar.current
        let year = calendar.component(.year, from: date)
        let month = String(format: "%02d", calendar.component(.month, from: date))
        let day = String(format: "%02d", calendar.component(.day, from: date))
        return "\(year)-\(month)-\(day)"
    }
    
    private func storageKey(for key: String) -> String {
        return "intake:\(key)"
    }
    
    func getIntake(for date: Date = Date()) -> Int {
        let key = dateKey(date)
        let storageKey = storageKey(for: key)
        guard let value = mmkv?.string(forKey: storageKey) else { return 0 }
        return Int(value) ?? 0
    }
    
    func setIntake(_ value: Int, for date: Date = Date()) {
        let key = dateKey(date)
        let storageKey = storageKey(for: key)
        mmkv?.set(String(value), forKey: storageKey)
    }
    
    func addIntake(_ amount: Int, for date: Date = Date()) {
        let current = getIntake(for: date)
        setIntake(current + amount, for: date)
    }
    
    func getGoal() -> Int {
        guard let value = mmkv?.string(forKey: "settings:goal") else { return 2000 }
        return Int(value) ?? 2000
    }
}


